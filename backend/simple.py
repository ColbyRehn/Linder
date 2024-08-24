import json
import os
def create_boss(name, age, distance, id):
    boss = {
        "name": name,
        "age": age,
        "distance": distance,
        "id": id,
        "number": 0
    }
    # save to json file
    # create the dir
    os.makedirs(f'resource/{id}', exist_ok=True)
    # create the file
    with open(f'resource/{id}/profile.json', 'w') as f:
        json.dump(boss, f)


create_boss("John", 30, 10, 1)

