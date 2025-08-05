
#!/usr/bin/env python3
"""
Standalone script to create admin users for the portfolio website.
Run this script to create new admin users without using the web interface.
"""

import os
import sys
from getpass import getpass
from werkzeug.security import generate_password_hash

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, db
from models import AdminUser

def create_admin():
    """Create a new admin user"""
    print("=== Portfolio Admin User Creation ===")
    print()
    
    with app.app_context():
        # Get user input
        username = input("Enter username: ").strip()
        if not username:
            print("Error: Username cannot be empty!")
            return False
            
        email = input("Enter email: ").strip()
        if not email:
            print("Error: Email cannot be empty!")
            return False
            
        password = getpass("Enter password: ").strip()
        if not password:
            print("Error: Password cannot be empty!")
            return False
            
        # Check if user already exists
        existing_user = AdminUser.query.filter(
            (AdminUser.username == username) | (AdminUser.email == email)
        ).first()
        
        if existing_user:
            print(f"Error: Admin with username '{username}' or email '{email}' already exists!")
            return False
            
        # Create new admin user
        try:
            admin_user = AdminUser()
            admin_user.username = username
            admin_user.email = email
            admin_user.password_hash = generate_password_hash(password)
            
            db.session.add(admin_user)
            db.session.commit()
            
            print(f"✅ Admin user '{username}' created successfully!")
            return True
            
        except Exception as e:
            print(f"Error creating admin user: {e}")
            db.session.rollback()
            return False

def list_admins():
    """List all existing admin users"""
    print("=== Current Admin Users ===")
    print()
    
    with app.app_context():
        admins = AdminUser.query.all()
        if not admins:
            print("No admin users found.")
            return
            
        for admin in admins:
            print(f"ID: {admin.id}")
            print(f"Username: {admin.username}")
            print(f"Email: {admin.email}")
            print(f"Created: {admin.created_at}")
            print("-" * 30)

def delete_admin():
    """Delete an admin user"""
    print("=== Delete Admin User ===")
    print()
    
    with app.app_context():
        # List current admins first
        admins = AdminUser.query.all()
        if not admins:
            print("No admin users found.")
            return False
            
        print("Current admin users:")
        for admin in admins:
            print(f"{admin.id}: {admin.username} ({admin.email})")
        print()
        
        try:
            admin_id = int(input("Enter admin ID to delete: ").strip())
            admin = AdminUser.query.get(admin_id)
            
            if not admin:
                print("Error: Admin user not found!")
                return False
                
            # Confirm deletion
            confirm = input(f"Are you sure you want to delete '{admin.username}'? (yes/no): ").strip().lower()
            if confirm != 'yes':
                print("Deletion cancelled.")
                return False
                
            db.session.delete(admin)
            db.session.commit()
            
            print(f"✅ Admin user '{admin.username}' deleted successfully!")
            return True
            
        except ValueError:
            print("Error: Please enter a valid admin ID!")
            return False
        except Exception as e:
            print(f"Error deleting admin user: {e}")
            db.session.rollback()
            return False

def main():
    """Main menu"""
    while True:
        print("\n=== Portfolio Admin Management ===")
        print("1. Create new admin user")
        print("2. List all admin users")
        print("3. Delete admin user")
        print("4. Exit")
        print()
        
        choice = input("Select an option (1-4): ").strip()
        
        if choice == '1':
            create_admin()
        elif choice == '2':
            list_admins()
        elif choice == '3':
            delete_admin()
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == '__main__':
    main()
