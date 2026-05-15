import sys
import json

answers = json.loads(sys.argv[1])

total = sum(answers)

if total <= 9:
    cluster = "Mild"
elif total <= 19:
    cluster = "Moderate"
else:
    cluster = "Severe"

print(json.dumps({
    "total": total,
    "cluster": cluster
}))