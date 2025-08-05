from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SelectField, DateField, PasswordField
from wtforms.validators import DataRequired, Email, Length, NumberRange, Optional
from wtforms.widgets import TextArea

class CKEditorWidget(TextArea):
    def __call__(self, field, **kwargs):
        kwargs.setdefault('class', 'ckeditor')
        return super(CKEditorWidget, self).__call__(field, **kwargs)

class CKEditorField(TextAreaField):
    widget = CKEditorWidget()

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    subject = StringField('Subject', validators=[Length(max=150)])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10)])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class ProjectForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=100)])
    short_description = StringField('Short Description', validators=[Length(max=200)])
    description = CKEditorField('Description', validators=[DataRequired()])
    category = SelectField('Category', choices=[
        ('web', 'Web Development'),
        ('mobile', 'Mobile App'),
        ('game', 'Game Development'),
        ('ai', 'AI/ML'),
        ('data', 'Data Science'),
        ('tool', 'Tool/Utility'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    tech_stack = StringField('Tech Stack (comma-separated)')
    tags = StringField('Tags (comma-separated)')
    github_link = StringField('GitHub Link')
    live_link = StringField('Live Demo Link')
    image = FileField('Project Image', validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif'])])
    is_featured = BooleanField('Featured Project')
    order_index = IntegerField('Display Order', default=0)

class SkillForm(FlaskForm):
    name = StringField('Skill Name', validators=[DataRequired(), Length(max=100)])
    category = SelectField('Category', choices=[
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools & Platforms'),
        ('languages', 'Programming Languages'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    level = IntegerField('Level (1-100)', validators=[DataRequired(), NumberRange(min=1, max=100)])
    order_index = IntegerField('Display Order', default=0)

class ExperienceForm(FlaskForm):
    job_title = StringField('Job Title', validators=[DataRequired(), Length(max=100)])
    company = StringField('Company', validators=[DataRequired(), Length(max=100)])
    location = StringField('Location', validators=[Length(max=100)])
    start_date = DateField('Start Date', validators=[DataRequired()])
    end_date = DateField('End Date', validators=[Optional()])
    description = CKEditorField('Description')
    is_current = BooleanField('Current Position')
    order_index = IntegerField('Display Order', default=0)

class BlogPostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=150)])
    slug = StringField('URL Slug', validators=[DataRequired(), Length(max=150)])
    excerpt = StringField('Excerpt', validators=[Length(max=300)])
    content = CKEditorField('Content', validators=[DataRequired()])
    tags = StringField('Tags (comma-separated)')
    image = FileField('Featured Image', validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif'])])
    is_published = BooleanField('Published')

class TestimonialForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100)])
    role = StringField('Role/Position', validators=[Length(max=100)])
    company = StringField('Company', validators=[Length(max=100)])
    message = TextAreaField('Testimonial', validators=[DataRequired()])
    rating = SelectField('Rating', choices=[(i, f'{i} Stars') for i in range(1, 6)], coerce=int, default=5)
    image = FileField('Photo', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
    is_featured = BooleanField('Featured Testimonial')
    order_index = IntegerField('Display Order', default=0)

class SettingsForm(FlaskForm):
    site_title = StringField('Site Title', validators=[DataRequired()])
    site_description = TextAreaField('Site Description')
    hero_title = StringField('Hero Title', validators=[DataRequired()])
    hero_subtitle = StringField('Hero Subtitle')
    about_text = CKEditorField('About Text')
    contact_email = StringField('Contact Email', validators=[Email()])
    github_url = StringField('GitHub URL')
    linkedin_url = StringField('LinkedIn URL')
    twitter_url = StringField('Twitter URL')
