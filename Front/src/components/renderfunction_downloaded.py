import wikitextparser as wtp

def parse(text):
  parse = wtp.parse(text)
  return parse

parsed = wtp.parse("""
... == h2 ==
... t2
... === h3 ===
... t3
... === h3 ===
... t3
... == h22 ==
... t22
... {{text|value3}}
... [[Z|X]]
... """)

print(parsed)