RISK_SCORES = {

    0: ("LOW", 10),

    1: ("MEDIUM", 40),

    2: ("MEDIUM", 55),

    3: ("HIGH", 75),

    4: ("HIGH", 90)

}


def calculate_risk(findings):

    count = len(findings)

    if count >= 5:

        return "CRITICAL", 100

    return RISK_SCORES.get(count, ("LOW", 10))