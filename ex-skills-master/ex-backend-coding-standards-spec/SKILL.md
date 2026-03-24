---
name: ex-backend-coding-standards-spec
description: 后端微服务编码规范，定义代码风格、数据库规范、HTTP接口规范、DTO使用规范、分页查询、仓储使用、ID生成、日期时间、逻辑删除、异常处理和领域事件等编码标准。此skill不由用户直接触发，由其他职责skill自动触发加载。
---

所有代码生成必须遵循本规范。代码风格遵循Alibaba Java Coding Guidelines。

1. 基础规则
- 生成代码时要有必要的代码注释和日志打印，使用英文
- 使用Lombok简化类代码，禁止手写默认构造函数、getter、setter
- 未实现或待修改的逻辑用TODO标记
- Spring Bean注入使用@Autowired，禁止使用final构造器注入
- 禁止在代码中写死常量
- 所有布尔型使用Boolean类（数据库字段定义为boolean型）
- 金额使用java.math.BigDecimal（数据库保留6位精度）
  
2. 实体规范
所有实体必须包含以下6个属性：
属性
类型
说明
version
Long
乐观锁
deleted
Boolean
逻辑删除标识，初始false
createTime
Instant
创建时间
createBy
String
创建人ID
updateTime
Instant
最后修改时间
updateBy
String
最后修改人ID
建议：操作日志、交易记录等在保存某个ID（如userId、tenantId）时，可同时保存相关实体名称（userName、tenantName）。

3. 领域对象规则
- 使用工厂方法创建领域实体对象
- 聚合根和实体中禁止静态创建方法，使用Factory的静态方法创建复杂对象
- 领域对象的行为方法必须表达明确业务语义
- 行为方法中有规则校验时，违反规则抛出异常
- 禁止出现updateStatus之类的通用行为命名

4. 数据库规范
- DDL使用Liquibase管理，放在src/main/resources/db/changelog/databaseChangeLog-baseline.xml
- 表命名：{工程代码以"-"分段的第一段}_{PO实体名}，如工程bsp-calendar的表前缀为bsp_

5. HTTP接口规范
- 路径前缀：/api/{工程代码}，示例：/api/upc-permission/roles/{roleId}
- GET用于所有查询（包括列表查询），参数放URL中，禁止用POST查询
- POST/PUT/DELETE用于新增/修改/删除
- Http请求Header包括以下常用参数，每次按请求场景传递该场景所需的参数，但一般不会同时存在所有参数，系统在使用这些参数时不需要显式的从header中获取，统一从com.ipaylinks.cloud.common.TenantContextHolder.require()中相应的get方法获取：
Header键
属性名
描述
X-tenant-id
tenantId
租户ID
X-merchant-id
merchantId
商户ID
X-agent-id
agentId
代理商ID
X-org-id
orgId
当前登录用户所属公司ID（用户登录门户的场景）
X-app-id
appId
合作方应用ID
X-user-id
userId
当前登录的用户ID（用户登录门户的场景）
X-provider-id
providerId
服务商ID
X-org-type
orgType
ORG类型 
X-platform-type

平台类型 (仅限网关传递，非必要不透传)
- 响应统一使用com.ipaylinks.cloud.openapi.spec.RestApiResponse<T>，包括code（响应码），message（响应描述）和data（响应业务数据对象）。成功时code=0。RestApiResponse依赖：com.ipaylinks:cloud-common

6. DTO规范
- 仅将请求Body和响应Body参数定义为DTO，Path参数和Query参数不定义DTO
- DTO中使用Bean Validation声明校验规则；无DTO时在Controller中校验
- DTO与领域对象的转换仅在Controller中通过converter完成，禁止在app层或domain层转换
  
7. 分页查询
- 默认每页10条，最大100条，页码从1开始
- 请求参数：currentPage、pageSize
- 响应使用com.ipaylinks.cloud.openapi.spec.PageModel<T>，PageModel包含两个主要属性Pagination对象（包含属性totalRecords、currentPage、pageSize、totalPages）和业务数据列表（records）。PageModel依赖：com.ipaylinks:cloud-common
- 仓储查询方法必须一次返回分页结果和数据记录，禁止拆分为两个方法
- 禁止在APP层出现统计记录总数的方法
- 查询条件超过2个参数时，封装为domain层VO，在Controller中构造后传入
  
8. 仓储规范
- 基于MyBatis-Plus实现，优先使用BaseMapper内置方法
- 禁止自定义SQL方法和XML格式mapper配置文件
- 修改对象时禁止直接修改整个对象，必须明确指定修改的属性
- 禁止使用save方法
- 查询单个实体必须使用java.util.Optional
  
9. ID生成
- ID为字符串
- 禁止使用数据库自增，统一使用com.ipaylinks.cloud.common.util.IDNumberUtils.generatorId()，IDNumberUtils依赖：com.ipaylinks:cloud-common
- 无特别说明时ID不带前缀
- 带前缀：IDNumberUtils.generatorId(String prefix)
  
10. 日期时间
场景
日期
时间
对外接口
yyyy-MM-dd字符串
时间戳long型
程序处理
java.time.LocalDate
java.time.Instant（UTC）
数据库存储
date
timestamptz

11. 逻辑删除
- 每个实体定义deleted属性（初始false）
- 禁止物理删除，只允许逻辑删除（设置deleted=true）
- 所有查询必须添加deleted=false过滤条件

12. 缓存规范
- 缓存Key格式：{服务名}:{业务key}，示例：bsp-calendar:calendar:sp001

13. 异常处理
- 异常使用com.ipaylinks.cloud.kernel.errors.Error
- 异常代码格式：{工程代码_明确含义英文}，大写，下划线连接
- 无需统一定义异常处理类，基础框架会进行统一异常处理
- 异常代码和描述定义为enum统一维护
- 建议：异常定义中包含有识别一笔业务的参数
- 在Application启动类中需要添加异常注解
- 使用方法：
在Application启动类中添加异常注解：
@EnableErrors({MyBizErrors.class})
public class MyApplication


定义异常：
import com.ipaylinks.cloud.common.enums.LanguageEnum;
import com.ipaylinks.cloud.kernel.I18n;
import com.ipaylinks.cloud.kernel.Module;
import com.ipaylinks.cloud.kernel.errors.AutoErrorConstant;
import com.ipaylinks.cloud.kernel.errors.Error;
import com.ipaylinks.cloud.kernel.errors.ErrorType;
import lombok.experimental.UtilityClass;

@UtilityClass
@AutoErrorConstant
@Module("MBE")//当前模块前缀，固定三位
public final class MyBizErrors {

@I18n(lang = LanguageEnum.zh_CN, pattern = "未找到对应的交易记录:{}")
@I18n(lang = LanguageEnum.en_US, pattern = "Transaction record not found:{}")
public static final Error TRANSACTION_NOT_FOUND = ErrorType.BUSINESS.of(1);

}

代码中抛出示例:
if (StringUtils.isBlank(bizOrderNo)) {
//带参数
throw MyBizErrors. TRANSACTION_NOT_FOUND .newInstance().params(bizOrderNo).toException();
//如果不带参数，去掉params
throw MyBizErrors. TRANSACTION_NOT_FOUND .newInstance().toException();
}

14. 领域事件规范
14.1 事件命名规范
14.1.1 事件类名
采用 {聚合根}{动作过去分词}Event 格式，表示"已经发生的事实"。例如：OrderPaidEvent（订单已支付事件）
命名约束：
- 必须使用英文，采用大驼峰（PascalCase）
- 必须以 Event 结尾
- 动词必须使用过去分词形式（表示已发生的事实，而非命令）
- 禁止使用 do、handle、process 等命令式动词
14.1.2 Kafka Topic
采用 {领域}-{聚合}-{动作过去分词} 格式，全小写，单词间用连字符分隔。
例如：
bsp-calendar-calendar-initialized
bsp-calendar-holiday-imported
csc-settlement-settlement-completed
14.1.3 事件类型标识（eventType）
采用 {领域}.{聚合}.{动作过去分词} 格式，全小写，层级间用点号分隔。
例如：
bsp.calendar.calendar.initialized
bsp.calendar.holiday.imported
csc.settlement.settlement.completed

14.2 事件结构规范
14.2.1 事件属性（所有事件必须包含）
| 属性      | 类型    | 必填 | 说明                          |
|-----------|---------|------|-------------------------------|
| eventId   | String  | 是   | 事件唯一标识（UUID）          |
| eventType | String  | 是   | 事件类型标识                  |
| eventTime | Instant | 是   | 事件发生时间（UTC，ISO 8601） |
| version   | Integer | 是   | 事件版本号，默认 `1`          |
| payload   | Object  | 是   | 事件体                        |

14.2.2 事件体（payload）
每个事件根据业务需要定义自己的payload属性，遵循以下原则：
- 最小化原则：只携带消费方需要的数据，不传递整个聚合根
- 自包含原则：消费方不需要回查生产方即可完成基本处理
- 不可变原则：事件一旦发布，内容不可修改
14.2.3 事件完整结构示例
{
  "eventId": "550e8400-e29b-41d4-a716-446655440000",
  "eventType": "bsp.calendar.calendar.initialized",
  "eventTime": "2026-02-23T08:30:00Z",
  "version": 1,
  "payload": {
    "year": 2026,
    "templateId": "TPL_CN_2026"
  }
}

14.3 事件生产规范
14.3.1 发布位置
- 领域事件由聚合根或领域服务产生
- 在应用服务中完成事件的实际发送
- 禁止在基础设施层直接发布领域事件
14.3.2 发布时机
- 事件必须在业务操作成功完成后发布
- 跨服务事件必须在本地事务提交后发送（保证事务一致性）
14.3.3 幂等性保证
- 每个事件必须携带全局唯一的 eventId
- 消费方必须基于 eventId 做幂等处理
- 生产方在发送失败时可安全重试

14.4 事件消费规范
14.4.1 消费者定义
- 消费者在 Web 层的 Event Listener 中定义
- 消费者调用应用服务完成业务处理
- 消费者必须实现幂等逻辑
14.4.2 消费失败处理
| 策略     | 说明                                              |
|----------|---------------------------------------------------|
| 重试     | 最多3次，间隔递增（1s、5s、30s）                  |
| 死信队列 | 重试耗尽后投入 `ex-{服务名}-dlq`，人工介入处理    |
| 告警     | 消费失败触发告警通知                              |