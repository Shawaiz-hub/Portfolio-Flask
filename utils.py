import os
import uuid
from werkzeug.utils import secure_filename
from PIL import Image
import re

def allowed_file(filename, allowed_extensions):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_uploaded_file(file, upload_folder, max_size=None):
    """Save uploaded file with unique filename"""
    if file and allowed_file(file.filename, {'png', 'jpg', 'jpeg', 'gif'}):
        # Generate unique filename
        filename = secure_filename(file.filename)
        name, ext = os.path.splitext(filename)
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        
        # Ensure upload directory exists
        os.makedirs(upload_folder, exist_ok=True)
        
        file_path = os.path.join(upload_folder, unique_filename)
        file.save(file_path)
        
        # Resize image if max_size is specified
        if max_size:
            resize_image(file_path, max_size)
        
        return unique_filename
    return None

def resize_image(file_path, max_size):
    """Resize image to fit within max_size while maintaining aspect ratio"""
    try:
        with Image.open(file_path) as img:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            img.save(file_path, optimize=True, quality=85)
    except Exception as e:
        print(f"Error resizing image: {e}")

def create_slug(title):
    """Create URL-friendly slug from title"""
    # Convert to lowercase and replace spaces with hyphens
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

def get_setting(key, default=None):
    """Get site setting value"""
    from models import SiteSettings
    setting = SiteSettings.query.filter_by(key=key).first()
    return setting.value if setting else default

def set_setting(key, value, description=None):
    """Set site setting value"""
    from app import db
    from models import SiteSettings
    
    setting = SiteSettings.query.filter_by(key=key).first()
    if setting:
        setting.value = value
        if description:
            setting.description = description
    else:
        setting = SiteSettings()
        setting.key = key
        setting.value = value
        setting.description = description
        db.session.add(setting)
    
    db.session.commit()
    return setting

def parse_tags(tags_string):
    """Parse comma-separated tags string into list"""
    if not tags_string:
        return []
    return [tag.strip() for tag in tags_string.split(',') if tag.strip()]

def parse_tech_stack(tech_string):
    """Parse comma-separated tech stack string into list"""
    if not tech_string:
        return []
    return [tech.strip() for tech in tech_string.split(',') if tech.strip()]
