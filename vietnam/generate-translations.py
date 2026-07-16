import re
import json
from pathlib import Path
from collections import Counter

HTML_PATH = Path("/Users/xiaoxiaoliu/Documents/Ipaylinks/IPL PRODUCT/EX-NEW/vietnam/fiat-crypto-platform-interactive.html")
GLOSSARY_PATH = Path("/Users/xiaoxiaoliu/Documents/Ipaylinks/IPL PRODUCT/EX-NEW/EXGLOSSARY/EX-glossary.md")
OUT_PATH = Path("/Users/xiaoxiaoliu/Documents/Ipaylinks/IPL PRODUCT/EX-NEW/vietnam/fiat-crypto-translations.md")

def parse_glossary(path):
    """Parse EX-glossary.md tables into a dict keyed by Simplified Chinese term."""
    text = path.read_text(encoding='utf-8')
    # Find all table rows | a | b | c | d |
    rows = re.findall(r'\|\s*([^|\n]+?)\s*\|\s*([^|\n]+?)\s*\|\s*([^|\n]+?)\s*\|\s*([^|\n]+?)\s*\|', text)
    mapping = {}
    for row in rows:
        zh_cn, zh_hk, en, note = row
        key = zh_cn.strip()
        # skip header-like rows
        if key in ('简体中文', '缩写', '中文'):
            continue
        mapping[key] = {
            'zh_hk': zh_hk.strip(),
            'en': en.strip(),
            'note': note.strip()
        }
    return mapping

def extract_strings(path):
    text = path.read_text(encoding='utf-8')
    # Extract sequences containing Chinese characters.
    pattern = re.compile(
        r'[\u4e00-\u9fff][\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\sA-Za-z0-9_%.,+/:\-]*|'
        r'[A-Za-z0-9]+[\u4e00-\u9fff][\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\sA-Za-z0-9_%.,+/:\-]*'
    )
    matches = pattern.findall(text)
    cleaned = []
    for m in matches:
        s = m.strip()
        # drop pure whitespace or single punctuation
        if s and any(ord(c) >= 0x4e00 and ord(c) <= 0x9fff for c in s):
            cleaned.append(s)
    return sorted(set(cleaned))

def find_match(s, glossary):
    """Find exact or contained glossary match."""
    # exact
    if s in glossary:
        return glossary[s]
    # try stripping common suffixes/prefixes and exact again
    stripped = s.strip('：:。.,？?！!')
    if stripped in glossary:
        return glossary[stripped]
    return None

def main():
    glossary = parse_glossary(GLOSSARY_PATH)
    strings = extract_strings(HTML_PATH)

    matched = []
    unmatched = []
    for s in strings:
        m = find_match(s, glossary)
        if m:
            matched.append((s, m['zh_hk'], m['en']))
        else:
            unmatched.append(s)

    lines = []
    lines.append("# fiat-crypto-platform-interactive.html UI 文案翻译")
    lines.append("")
    lines.append("> 来源：`fiat-crypto-platform-interactive.html`")
    lines.append("> 术语参考：`EX-glossary.md`（v3.6）")
    lines.append("> 列：简体中文 | 繁體中文（粵語） | English")
    lines.append("")
    lines.append(f"共提取 **{len(strings)}** 条不重复文案，其中术语表自动匹配 **{len(matched)}** 条，剩余 **{len(unmatched)}** 条需人工翻译。")
    lines.append("")
    lines.append("---")
    lines.append("")

    lines.append("## 一、术语表自动匹配项")
    lines.append("")
    lines.append("| 简体中文 | 繁體中文（粵語） | English |")
    lines.append("| --- | --- | --- |")
    for s, zh_hk, en in matched:
        lines.append(f"| {s} | {zh_hk} | {en} |")
    lines.append("")
    lines.append("## 二、需人工翻译项")
    lines.append("")
    lines.append("| 简体中文 | 繁體中文（粵語） | English |")
    lines.append("| --- | --- | --- |")
    for s in unmatched:
        lines.append(f"| {s} |  |  |")

    OUT_PATH.write_text('\n'.join(lines), encoding='utf-8')
    print(f"Wrote translation draft to {OUT_PATH}")
    print(f"Matched: {len(matched)}, Unmatched: {len(unmatched)}")

if __name__ == '__main__':
    main()
