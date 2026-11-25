def divide(a, b):
    return a / b

def get_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            return user
