# Eurewax Open API 技术对接流程

## 一、账号准备与密钥配置

### 1.1 获取测试账号和域名

* **操作方式** ：联系技术支持团队
* **获取内容** ：
* 测试账号（Account No）
* 测试域名（Test Domain）
* APP ID（用于API调用）
* 平台公钥（用于验签）
* AES KEY （用于内容加密）

### 1.2 生成客户RSA密钥对

 **密钥生成算法** ：SHA256withRSA

#### 方式一：使用 OpenSSL（推荐）

```Bash
# 生成私钥（2048位）
openssl genrsa -out private_key.pem 2048

# 从私钥生成公钥
openssl rsa -in private_key.pem -pubout -out public_key.pem

# 查看公钥内容
cat public_key.pem
```

#### 方式二：使用 Java 代码

```Java
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

public class RSAKeyGenerator {
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
      
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();
      
        // 编码为 Base64
        String privateKeyStr = Base64.getEncoder().encodeToString(privateKey.getEncoded());
        String publicKeyStr = Base64.getEncoder().encodeToString(publicKey.getEncoded());
      
        System.out.println("Private Key:\n" + privateKeyStr);
        System.out.println("\nPublic Key:\n" + publicKeyStr);
    }
}
```

#### 方式三：使用在线工具

* 访问：https://travistidwell.com/jsencrypt/demo/
* 或：https://www.allkeysgenerator.com/

### 1.3 上传公钥

 **操作步骤** ：

1. 登录 Eurewax 管理平台
2. 进入 **开发者管理 → ****API****申请 → 客户****公钥**
3. 点击 **上传** 按钮
4. 粘贴生成的公钥内容
5. 保存

 **验证** ：上传成功后，页面会显示公钥指纹（Fingerprint）

### 1.4 AES Key

 **用途** ：用于加密敏感信息（如收款账号、身份证号等）

 **加密方式** ：AES-GCM（Galois/Counter Mode）- 提供认证加密，更安全

### 1.5 AES Key 加密解密算法

 **用途** ：使用 AES Key 对敏感数据进行加密和解密

 **加密解密算法** ：AES-GCM（Galois/Counter Mode）

#### 加密解密代码示例

```Java
package com.ipaylinks.ex.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

/**
 * AES加密解密工具类
 * 提供安全的AES-GCM加密解密功能，支持Base64编码的密钥和密文
 * 
 * 安全特性：
 * - 使用AES-GCM模式，提供认证加密
 * - 每次加密生成随机IV，确保相同明文产生不同密文
 * - 使用SHA-256派生密钥，提高密钥安全性
 * - 支持256位密钥长度
 * 
 * @author system
 */
@UtilityClass
@Slf4j
public final class AesUtil {

    private static final String KEY_AES = "AES";
    private static final String CIPHER_ALGORITHM = "AES/GCM/NoPadding";
    private static final int IV_SIZE = 12; // GCM推荐12字节IV
    private static final int TAG_SIZE = 16; // GCM认证标签长度
    private static final String HASH_ALGORITHM = "SHA-256";

    /**
     * AES-GCM加密
     * 
     * @param secret Base64编码的密钥种子
     * @param plainText 待加密的明文
     * @return Base64编码的密文（包含IV），加密失败返回null
     */
public static String encrypt(String secret, String plainText) {
        log.debug("AES加密：secret长度:{}, plainText长度:{}", secret != null ? secret.length() : 0, plainText != null ? plainText.length() : 0);
      
        if (secret == null || plainText == null) {
            log.error("AES加密失败：密钥或明文为空");
            return null;
        }
      
        try {
            // 解码Base64密钥种子并派生256位密钥
            byte[] secretBytes = Base64.getDecoder().decode(secret);
            byte[] derivedKey = deriveKey(secretBytes);
            SecretKeySpec secretKeySpec = new SecretKeySpec(derivedKey, KEY_AES);
          
            // 生成随机IV
            byte[] iv = new byte[IV_SIZE];
            SecureRandom.getInstanceStrong().nextBytes(iv);
          
            // 执行GCM加密
            Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
            GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_SIZE * 8, iv);
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, gcmSpec);
            byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
          
            // 组合IV和密文
            byte[] cipherWithIv = new byte[IV_SIZE + encryptedBytes.length];
            System.arraycopy(iv, 0, cipherWithIv, 0, IV_SIZE);
            System.arraycopy(encryptedBytes, 0, cipherWithIv, IV_SIZE, encryptedBytes.length);
          
            // 返回Base64编码的密文
            String cipherText = Base64.getEncoder().encodeToString(cipherWithIv);
            log.debug("AES-GCM加密成功，密文长度:{}", cipherText.length());
            return cipherText;
          
        } catch (Exception e) {
            log.error("AES加密异常：plainText长度:{}", plainText.length(), e);
            return null;
        }
    }

    /**
     * AES-GCM解密
     * 
     * @param secret Base64编码的密钥种子
     * @param cipherText Base64编码的密文（包含IV）
     * @return 解密后的明文，解密失败返回null
     */
public static String decrypt(String secret, String cipherText) {
        log.debug("AES解密：secret长度:{}, cipherText长度:{}", secret != null ? secret.length() : 0, cipherText != null ? cipherText.length() : 0);
      
        if (secret == null || cipherText == null) {
            log.error("AES解密失败：密钥或密文为空");
            return null;
        }
      
        try {
            // 解码Base64密钥种子和密文
            byte[] secretBytes = Base64.getDecoder().decode(secret);
            byte[] cipherWithIv = Base64.getDecoder().decode(cipherText);
          
            // 检查密文长度
            if (cipherWithIv.length < IV_SIZE + TAG_SIZE) {
                log.error("AES解密失败：密文长度不足，期望至少{}字节，实际{}字节", IV_SIZE + TAG_SIZE, cipherWithIv.length);
                return null;
            }
          
            // 分离IV和密文
            byte[] iv = Arrays.copyOfRange(cipherWithIv, 0, IV_SIZE);
            byte[] encryptedBytes = Arrays.copyOfRange(cipherWithIv, IV_SIZE, cipherWithIv.length);
          
            // 派生密钥
            byte[] derivedKey = deriveKey(secretBytes);
            SecretKeySpec secretKeySpec = new SecretKeySpec(derivedKey, KEY_AES);
          
            // 执行GCM解密
            Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
            GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_SIZE * 8, iv);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, gcmSpec);
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
          
            // 返回解密后的明文
            String plainText = new String(decryptedBytes, StandardCharsets.UTF_8);
            log.debug("AES-GCM解密成功，明文长度:{}", plainText.length());
            return plainText;
          
        } catch (Exception e) {
            log.error("AES-GCM解密异常：cipherText长度:{}", cipherText.length(), e);
            return null;
        }
    }
  
    /**
     * 使用SHA-256派生密钥
     * 
     * @param seed 密钥种子
     * @return 派生的256位密钥
     */
private static byte[] deriveKey(byte[] seed) {
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
            byte[] hash = digest.digest(seed);
            // SHA-256产生32字节(256位)哈希，正好符合AES-256要求
            return hash;
        } catch (Exception e) {
            log.error("密钥派生失败", e);
            throw new RuntimeException("密钥派生失败", e);
        }
    }
}
```

 **安全特性** ：

* ✅ 提供认证加密，防止数据篡改
* ✅ 使用 SHA-256 派生密钥，增强安全性

### 1.6 配置回调地址

 **操作步骤** ：

1. 登录 Eurewax 管理平台
2. 进入 **开发者管理→** **API** **申请 ** → **回调地址**
3. 点击 **设置回调地址**
4. 输入回调 URL（例如：`https://your-domain.com/api/callback`）
5. 保存

 **回调地址要求** ：

* 必须是 HTTPS 协议
* 必须能够接收 POST 请求

**回调** **事件类型** ：

* 收款人审核结果通知
* 入网结果通知
* 其他业务状态变更通知

---

## 二、接口调用规范

### 2.1 报文结构

详情可查阅https://open.eurewax.com/%E6%8A%A5%E6%96%87%E7%BB%93%E6%9E%84-6918044m0

### 2.2 签名规则

 **签名算法** ：SHA256withRSA

#### 签名步骤

1. https://open.eurewax.com/%E7%AD%BE%E5%90%8D-6918045m0
2. **加签验签代码示例** ：

```Java
package com.ipaylinks.mp.gateway.biz.ex.sign;

import lombok.experimental.UtilityClass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@UtilityClass
public class RsaUtil {
    private static final Logger logger = LoggerFactory.getLogger(RsaHelper.class);
    private static final String ALGORITHM = "SHA256withRSA";

    public static String sign(String privateKey, byte[][] contents) {
        return sign(loadPrivateKeyFromPem(privateKey), contents);
    }
    public static String sign(PrivateKey privateKey, byte[][] contents) {
        try {
            Signature signature = Signature.getInstance(ALGORITHM);
            signature.initSign(privateKey);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            for (byte[] content : contents) {
                if (content != null) {
                    outputStream.write(content);
                }
            }
            signature.update(outputStream.toByteArray());
            byte[] signedBytes = signature.sign();
            return Base64.getEncoder().encodeToString(signedBytes);
        } catch (Exception exception) { // NOSONAR
            logger.error("fail to sign the data", exception);
            throw new IllegalStateException("fail to sign the data", exception);
        }
    }


    public static boolean verify(PublicKey publicKey, String based64EncodedSign, byte[][] contents) {
        try {
            Signature signature = Signature.getInstance(ALGORITHM);
            signature.initVerify(publicKey);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            for (byte[] content : contents) {
                if (content != null) {
                    outputStream.write(content);
                }
            }
            signature.update(outputStream.toByteArray());
            byte[] sign = Base64.getDecoder().decode(based64EncodedSign);
            return signature.verify(sign);
        } catch (Exception exception) { // NOSONAR
            logger.error("fail to verify the data", exception);
            throw new IllegalStateException("fail to verify the data", exception);
        }
    }


    // 生成一对 RSA 密钥对
    public static KeyPair generateRsaKeyPair(int keySize) throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(keySize);
        return generator.generateKeyPair();
    }

    // 转为 PEM 格式
    public static String toPem(Key key, boolean isPrivate) {
        String type = isPrivate ? "PRIVATE" : "PUBLIC";
        return "-----BEGIN " + type + " KEY-----\n"
                + Base64.getMimeEncoder(64, new byte[]{'\n'}).encodeToString(key.getEncoded())
                + "\n-----END " + type + " KEY-----\n";
    }

    // 从 PEM 格式读取私钥
    public static PrivateKey loadPrivateKeyFromPem(String pem) {
        try {
            String base64 = pem.replaceAll("-----\\w+ PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] keyBytes = Base64.getDecoder().decode(base64);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);

            return KeyFactory.getInstance("RSA").generatePrivate(spec);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException exception) { // NOSONAR
            logger.error("fail to load rsa private key", exception);
            throw new IllegalStateException("fail to load rsa private key", exception);
        }
    }

    // 从 PEM 格式读取公钥
    public static PublicKey loadPublicKeyFromPem(String pem) {
        String base64 = pem.replaceAll("-----\\w+ PUBLIC KEY-----", "")
                .replaceAll("\\s", "");
        byte[] keyBytes = Base64.getDecoder().decode(base64);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        try {
            return KeyFactory.getInstance("RSA").generatePublic(spec);
        }catch (Exception exception) { // NOSONAR
            logger.error("fail to load rsa public key", exception);
            throw new IllegalStateException("fail to load rsa public key", exception);
        }

    }
}
```

1. **将签名值放入请求报文的 sign 字段**

---

## 三、复杂业务接口规范

### 3.1 KYC 调用规则（香港地区）

#### 详情请查阅[KYC认证申请接口说明文档-香港](https://m0t7yytxafc.feishu.cn/wiki/ALJVwBIKGidqoekzGPjcuHdfnld)

---

### 3.2 数币业务 - 添加法币收款人（香港地区）

#### 银行账号验证规则

| 支付方式 | 账号类型 | 验证规则                | 说明                                   |
| -------- | -------- | ----------------------- | -------------------------------------- |
| SWIFT    | BBAN     | `^[0-9]{1,17}$`       | 验证 bankAccountNumber                 |
| SWIFT    | IBAN     | `^GB[a-zA-Z0-9]{20}$` | 验证 bankAccountNumber前两位是地区编码 |
| FPS      | BBAN     | `^[0-9]{1,17}$`       | 香港 FPS 支付                          |
| RTGS     | BBAN     | `^[0-9]{1,17}$`       | 香港 RTGS 支付                         |

#### SWIFT Code 验证规则

```Plaintext
格式：^[A-Z]{6}([0-9A-Z]{2}|[0-9A-Z]{5})$

结构示例：ABCDUS33XXX
├─ ABCD: 银行代码（4位字母）
├─ US: 国家代码（2位）← 必须与 bankAccountCountry 一致
└─ 33XXX: 分支代码（3位，可选）

验证要点：
1. 长度：8-11 位
2. 前 4 位必须是字母
3. 第 5-6 位（国家代码）必须与 bankAccountCountry 匹配
4. 第 7-11 位（可选）可以是字母或数字
```

### 3.3 法币业务 - 添加收款人（香港地区）

#### 账号验证规则

| 清算系统        | 账号类型   | 验证规则                                | 字段                 |
| --------------- | ---------- | --------------------------------------- | -------------------- |
| **SWIFT** | BBAN       | `^[0-9]{1,17}$`                       | bankAccountNumber    |
| **SWIFT** | IBAN       | `^GB[a-zA-Z0-9]{20}$`                 | bankAccountNumber    |
| **SWIFT** | SWIFT Code | `^[A-Z]{6}([0-9A-Z]{2}\|[0-9A-Z]{5})$` | accountRoutingValue1 |
| **FPS**   | BBAN       | `^[0-9]{1,17}$`                       | bankAccountNumber    |
| **RTGS**  | BBAN       | `^[0-9]{1,17}$`                       | bankAccountNumber    |
| **ACH**   | ABA        | `^[0-9]{9}$`                          | accountRoutingValue2 |
| **BSB**   | BSB Code   | `^[0-9]{3}-[0-9]{3}$`                 | accountRoutingValue2 |
| **IFSC**  | IFSC Code  | `^[A-Z]{4}0[A-Z0-9]{6}$`              | accountRoutingValue2 |

---

## 四、常见错误码

| 错误码        | 场景名                                             | 模块     | 中文描述                                                                            | 英文描述                                                                                                                      | 参数                            |
| ------------- | -------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| ER-OBDBBX0001 | BUSINESS_ERROR                                     | 交易模块 | 业务处理失败：{}                                                                    | Business processing failed: {}                                                                                                | ``                       |
| ER-OBDBBX0002 | SYSTEM_ERROR                                       | 交易模块 | 系统异常，请稍后再试                                                                | System error please try again later                                                                                           | ``                       |
| ER-OBDBBX0003 | INVALID_PARAMETER                                  | 交易模块 | 参数验证失败：{}                                                                    | Parameter validation failed: {}                                                                                               | ``                       |
| ER-OBDBBX0004 | DUPLICATE_REQUEST                                  | 交易模块 | bizOrderNo重复                                                                      | bizOrderNo duplicate                                                                                                          | ``                       |
| ER-OBDBBX0005 | TRANSACTION_NOT_FOUND                              | 交易模块 | 未找到对应的交易记录                                                                | Transaction record not found                                                                                                  | ``                       |
| ER-OBDBBX0006 | MISSING_QUERY_PARAMETER                            | 交易模块 | 业务订单号和交易ID至少填写一个                                                      | Either bizOrderNo or transactionId is required                                                                                | ``                       |
| ER-OBDBBX0007 | INVALID_TRANSACTION_STATUS                         | 交易模块 | 当前交易状态不允许此操作，当前状态: {}                                              | Current transaction status does not allow this operation current status: {}                                                   | ``                       |
| ER-OBDBBX0008 | UNSUPPORTED_TRANSACTION_TYPE                       | 交易模块 | 不支持的交易类型: {}                                                                | Unsupported transaction type: {}                                                                                              | ``                       |
| ER-OBDBBX0009 | PROVIDER_CALL_FAILED                               | 交易模块 | 渠道调用失败，响应内容: {}                                                          | Provider call failed with response: {}                                                                                        | ``                       |
| ER-OBDBBX0010 | MERCHANT_ID_QUERY_FAILED                           | 交易模块 | 商户ID查询失败，商户号: {}                                                          | Merchant ID query failed for merchantNo: {}                                                                                   | ``                       |
| ER-OBDBBX0011 | TRANSACTION_VALIDATION_FAILED                      | 交易模块 | 交易数据验证失败: {field}                                                           | Transaction data validation failed: {field}                                                                                   | field                           |
| ER-OBDBBX0012 | NO_PERMISSION                                      | 交易模块 | 无权操作此交易                                                                      | No permission to operate this transaction                                                                                     | ``                       |
| ER-OBDBBX0013 | QUOTE_EXPIRED                                      | 交易模块 | 报价已过期，报价ID: {}                                                              | Quote has expired quoteId: {}                                                                                                 | ``                       |
| ER-OBDBBX0014 | QUOTE_NOT_FOUND                                    | 交易模块 | 未找到对应的报价记录                                                                | Quote record not found                                                                                                        | ``                       |
| ER-OBDBBX0015 | AMOUNT_OUT_OF_RANGE                                | 交易模块 | 金额超出限制，最小: {} 最大: {} 当前: {}                                            | Amount out of range min: {} max: {} current: {}                                                                               | ``                       |
| ER-OBDBBX0016 | UNSUPPORTED_CURRENCY                               | 交易模块 | 不支持的币种: {}                                                                    | Unsupported currency: {}                                                                                                      | ``                       |
| ER-OBDBBX0017 | ACCOUNT_NOT_FOUND                                  | 交易模块 | 账户不存在，账户ID: {}                                                              | Account not found accountId: {}                                                                                               | ``                       |
| ER-OBDBBX0018 | PAYEE_NOT_FOUND                                    | 交易模块 | 收款方不存在，收款方ID: {}                                                          | Payee not found payeeId: {}                                                                                                   | ``                       |
| ER-OBDBBX0019 | PROVIDER_CONFIG_ERROR                              | 交易模块 | 渠道配置错误: {}                                                                    | Provider configuration error: {}                                                                                              | ``                       |
| ER-OBDBBX0020 | TRANSACTION_CREATE_FAILED                          | 交易模块 | 交易创建失败: {}                                                                    | Transaction creation failed: {}                                                                                               | ``                       |
| ER-OBDBBX0021 | TRANSACTION_UPDATE_FAILED                          | 交易模块 | 交易更新失败: {}                                                                    | Transaction update failed: {}                                                                                                 | ``                       |
| ER-OBDBBX0022 | QUOTE_NOT_FOUND_IN_CACHE                           | 交易模块 | 报价不存在或已过期，报价ID: {}                                                      | Quote not found in cache or expired quoteId: {}                                                                               | ``                       |
| ER-OBDBBX0023 | QUOTE_MERCHANT_MISMATCH                            | 交易模块 | 报价商户号不匹配，无权使用此报价                                                    | Quote merchant number mismatch no permission to use this quote                                                                | ``                       |
| ER-OBDBBX0024 | NO_PAYEE_ACCOUNT                                   | 交易模块 | 没有添加收款账号                                                                    | No payee account added                                                                                                        | ``                       |
| ER-OBDBBX0025 | TRANSACTION_STATUS_NOT_INIT                        | 交易模块 | 状态非初始状态，无法创建付款:{}                                                     | Transaction status is not initial cannot create merchant payment:{}                                                           | ``                       |
| ER-OBDBBX0026 | TRANSACTION_STATUS_NOT_SUCCESS_FORBIDDEN_RECHARGE  | 交易模块 | 状态非成功状态，无法创建充值:{}                                                     | Transaction status is not success cannot create merchant recharge:{}                                                          | ``                       |
| ER-OBDBBX0027 | PROVIDER_TXN_STATUS_NOT_SUCCESS_FORBIDDEN_RECHARGE | 交易模块 | 数币转法币渠道单状态非成功状态，无法创建充值:{}                                     | Provider transaction status is not success cannot create merchant recharge:{}                                                 | ``                       |
| ER-OBDBBX0028 | MERCHANT_RECHARGE_TXN_FAILED                       | 交易模块 | 商户充值失败                                                                        | Merchant recharge failed                                                                                                      | ``                       |
| ER-OBDBBX0029 | MERCHANT_WITHDRAW_TXN_FAILED                       | 交易模块 | 商户提现失败                                                                        | Merchant withdraw failed                                                                                                      | ``                       |
| ER-OBDBBX0033 | UNSUPPORTED_PAYMENT_AMOUNT_TYPE                    | 交易模块 | 不支持的付款金额类型: {}                                                            | Unsupported payment amount type: {}                                                                                           | ``                       |
| ER-STTBBX0002 | DECRYPT_FAILED                                     | 内容解密 | 解密操作失败                                                                        | decrypt failed                                                                                                                | ``                       |
| ER-EHOBBX0001 | BUSINESS_ERROR                                     | 入网     | 业务处理失败：{}。可能原因：渠道调用失败、数据不完整、无成功的KYC记录、商户号未找到 | Business processing failed: {}. Possible reasons: channel call failed                                                         | incomplete data                 |
| ER-EHOBBX0002 | SYSTEM_ERROR                                       | 入网     | 系统异常，请稍后再试                                                                | System error                                                                                                                  | please try again later          |
| ER-EHOBBX0003 | INVALID_PARAMETER                                  | 入网     | 参数验证失败：{message}。请检查必填字段是否完整                                     | Parameter validation failed: {message}. Please check if required fields are complete                                          | message                         |
| ER-EHOBBX0004 | DUPLICATE_REQUEST                                  | 入网     | bizOrderNo重复。同一个业务订单号被不同的商户号重复提交                              | bizOrderNo duplicate. The same business order number is submitted repeatedly by different merchant numbers                    | 无                              |
| ER-EHOBBX0004 | DUPLICATE_SUBMIT                                   | 入网     | 请勿重复提交。同一商户的所有可用渠道都已成功处理过KYC                               | Do not submit repeatedly. All available channels for the same merchant have been successfully processed for KYC               | 无                              |
| ER-EHOBBX0008 | 公司名称格式错误                                   | 入网     | 请输入正确的公司经营名称(需有英文名称)。BB渠道要求公司名称必须为英文                | Please enter the correct company business name (must contain English name). BB channel requires company name to be in English | 无                              |
| ER-HCPBBX0005 | PAYEE_NOT_FOUND                                    | 收款人   | 收款人记录不存在，收款人ID: {payeeId}                                               | Payee record not found                                                                                                        | payeeId: {payeeId}              |
| ER-HCPBBX0006 | INVALID_PAYEE_STATUS                               | 收款人   | 当前收款人状态不允许此操作，当前状态: {currentStatus}                               | Current payee status does not allow this operation                                                                            | current status: {currentStatus} |
| ER-HCPBBX0007 | PROVIDER_CALL_FAILED                               | 收款人   | 渠道调用失败，响应内容: {response}                                                  | Provider call failed with response: {response}                                                                                | ``                       |
| ER-HCPBBX0008 | PROVIDER_CONFIG_ERROR                              | 收款人   | 渠道配置错误: {message}                                                             | Provider configuration error: {message}                                                                                       | ``                       |
| ER-HCPBBX0009 | PAYEE_CREATE_FAILED                                | 收款人   | 收款人创建失败: {message}                                                           | Payee creation failed: {message}                                                                                              | ``                       |
| ER-HCPBBX0010 | PAYEE_UPDATE_FAILED                                | 收款人   | 收款人更新失败: {message}                                                           | Payee update failed: {message}                                                                                                | ``                       |
| ER-HCPBBX0011 | PAYEE_DELETE_FAILED                                | 收款人   | 收款人删除失败: {message}                                                           | Payee deletion failed: {message}                                                                                              | ``                       |
| ER-HCPBBX0012 | PAYEE_QUERY_FAILED                                 | 收款人   | 收款人查询失败: {message}                                                           | Payee query failed: {message}                                                                                                 | ``                       |
| ER-HCPBBX0015 | UNSUPPORTED_PAYEE_TYPE                             | 收款人   | 不支持的收款人类型: {payeeType}                                                     | Unsupported payee type: {payeeType}                                                                                           | ``                       |
| ER-HCPBBX0016 | PAYEE_INFO_INCOMPLETE                              | 收款人   | 收款人信息不完整: {message}                                                         | Payee information incomplete: {message}                                                                                       | ``                       |
| ER-HCPBBX0017 | PROVIDER_PAYEE_ID_NOT_FOUND                        | 收款人   | 未获取到渠道收款人ID，收款人ID: {payeeId}                                           | Provider payee ID not obtained                                                                                                | payeeId: {payeeId}              |
| ER-HCPBBX0018 | PAYEE_ALREADY_EXISTS                               | 收款人   | 收款人已存在，业务订单号: {bizOrderNo}                                              | Payee already exists                                                                                                          | bizOrderNo: {bizOrderNo}        |
| ER-HCPBBX0019 | UNSUPPORTED_OPERATION_TYPE                         | 收款人   | 不支持的操作类型: {operationType}                                                   | Unsupported operation type: {operationType}                                                                                   | ``                       |
| ER-HCPBBX0020 | PAYEE_STATUS_UPDATE_FAILED                         | 收款人   | 收款人状态更新失败: {message}                                                       | Payee status update failed: {message}                                                                                         | ``                       |
| ER-HCPBBX0021 | PAYEE_NOT_EXIST                                    | 收款人   | 收款人不存在，收款人ID: {payeeId}                                                   | Payee not found                                                                                                               | payeeId: {payeeId}              |
| ER-HCPBBX0022 | PAYEE_TYPE_ERROR                                   | 收款人   | 收款人类型错误，收款人ID: {payeeId}                                                 | Payee type error                                                                                                              | payeeId: {payeeId}              |

---

## 五、测试清单

### 5.1 密钥配置测试

* RSA 公钥已上传
* 回调地址已配置
* 签名验证通过
* 加密解密正常

### 5.2 接口测试

### 5.3 回调测试

---

## 六、联系方式

| 支持项   | 联系方式                          |
| -------- | --------------------------------- |
| 技术支持 | long.chu@ipaylinks.com            |
| API 文档 | https://open.eurewax.com/api-docs |
| 紧急问题 | +86 15501055188（24小时）         |

---

 **文档版本** ：v1.0
 **最后更新** ：2026-01-26
 **适用范围** ：Eurewax Open API v2.0+
