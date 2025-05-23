import bcrypt

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = self.hash_password(password)

    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

class UserManager:
    def __init__(self):
        self.users = {}

    def create_user(self, username, password):
        if not username or not password:
            raise ValueError("Username and password cannot be empty.")
        if username in self.users:
            return False
        self.users[username] = User(username, password)
        return True

    def update_password(self, username, new_password):
        if not new_password:
            raise ValueError("Password cannot be empty.")
        if username in self.users:
            self.users[username].password = self.users[username].hash_password(new_password)
            return True
        return False

    def delete_user(self, username):
        if username in self.users:
            del self.users[username]
            return True
        return False

    def authenticate_user(self, username, password):
        if username in self.users:
            user = self.users[username]
            return bcrypt.checkpw(password.encode('utf-8'), user.password)
        return False

# Exemplo de uso
user_manager = UserManager()
user_manager.create_user("john_doe", "password123")
print(user_manager.authenticate_user("john_doe", "password123"))  # Saída: True
print(user_manager.authenticate_user("john_doe", "wrong_password")) # Saída: False