import json
import os


def create_boss(name, age, distance, bio,id):
    boss = {
        "name": name,
        "age": age,
        "distance": distance,
        "id": id,
        "bio": bio,
        "number": 0
    }
    # save to json file
    # create the dir
    os.makedirs(f'resource/{id}', exist_ok=True)
    # create the file
    with open(f'resource/{id}/profile.json', 'w') as f:
        json.dump(boss, f)


if __name__ == '__main__':
    # get args 
    name = input("Enter the name of the boss: ")
    age = input("Enter the age of the boss: ")
    distance = input("Enter the distance of the boss: ")
    bio = input("Enter the bio of the boss: ")
    id = input("Enter the id of the boss: ")
    create_boss(name, age, distance, bio,id)
    print("Boss created successfully")

