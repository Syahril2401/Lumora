import re, os

# Read all Vue source files
base = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\finpro-fe-VILT\resources\js"

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def extract_template(vue_content):
    """Extract template section from Vue file"""
    match = re.search(r'<template>(.*?)</template>', vue_content, re.DOTALL)
    return match.group(1).strip() if match else ""

def vue_to_html(template):
    """Convert Vue template to static HTML"""
    # Remove Vue directives
    html = template
    
    # Remove v-if, v-else, v-for, v-model, v-bind, etc.
    html = re.sub(r'\s*v-if="[^"]*"', '', html)
    html = re.sub(r'\s*v-else[^"]*', '', html)
    html = re.sub(r'\s*v-for="[^"]*"', '', html)
    html = re.sub(r'\s*v-model[^"]*', '', html)
    html = re.sub(r'\s*:class="[^"]*"', '', html)
    html = re.sub(r'\s*:style="[^"]*"', '', html)
    html = re.sub(r'\s*:href="[^"]*"', '', html)
    html = re.sub(r'\s*:src="[^"]*"', '', html)
    html = re.sub(r'\s*:disabled="[^"]*"', '', html)
    html = re.sub(r'\s*:key="[^"]*"', '', html)
    html = re.sub(r'\s*@click="[^"]*"', '', html)
    html = re.sub(r'\s*@submit.prevent="[^"]*"', '', html)
    html = re.sub(r'\s*@click.self="[^"]*"', '', html)
    html = re.sub(r'\s*x-show="[^"]*"', '', html)
    
    # Replace {{ }} with sample data
    html = re.sub(r'\{\{[^}]+\}\}', 'Sample Text', html)
    
    # Replace <Link> with <a>
    html = re.sub(r'<Link\s+', '<a ', html)
    html = html.replace('</Link>', '</a>')
    
    # Replace route() with #
    html = re.sub(r':href="route\([^)]+\)"', 'href="#"', html)
    html = re.sub(r'href="route\([^)]+\)"', 'href="#"', html)
    
    # Remove <Head> tags
    html = re.sub(r'<Head[^>]*/>', '', html)
    html = re.sub(r'<Head[^>]*>.*?</Head>', '', html, flags=re.DOTALL)
    
    # Remove <Teleport> tags but keep content
    html = re.sub(r'<Teleport[^>]*>', '', html)
    html = html.replace('</Teleport>', '')
    
    # Remove <script setup> and <style scoped> sections
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)
    
    # Clean up empty lines
    html = re.sub(r'\n\s*\n\s*\n', '\n\n', html)
    
    return html.strip()

# Read Vue files
landing_vue = read_file(os.path.join(base, 'Pages/Landing.vue'))
sanctuary_vue = read_file(os.path.join(base, 'Pages/Onboarding/Sanctuary.vue'))
questionnaire_vue = read_file(os.path.join(base, 'Pages/Onboarding/Questionnaire.vue'))
result_vue = read_file(os.path.join(base, 'Pages/Onboarding/Result.vue'))
dashboard_vue = read_file(os.path.join(base, 'Pages/Dashboard.vue'))
notes_vue = read_file(os.path.join(base, 'Pages/Dashboard/Notes.vue'))
planner_vue = read_file(os.path.join(base, 'Pages/Dashboard/Planner.vue'))
targets_vue = read_file(os.path.join(base, 'Pages/Dashboard/WeeklyTargets.vue'))
progress_vue = read_file(os.path.join(base, 'Pages/Dashboard/Progress.vue'))
settings_vue = read_file(os.path.join(base, 'Pages/Dashboard/Settings.vue'))
layout_vue = read_file(os.path.join(base, 'Layouts/DashboardLayout.vue'))
login_vue = read_file(os.path.join(base, 'Pages/Auth/Login.vue'))
register_vue = read_file(os.path.join(base, 'Pages/Auth/Register.vue'))

# Extract templates
landing_tpl = extract_template(landing_vue)
sanctuary_tpl = extract_template(sanctuary_vue)
questionnaire_tpl = extract_template(questionnaire_vue)
result_tpl = extract_template(result_vue)
dashboard_tpl = extract_template(dashboard_vue)
notes_tpl = extract_template(notes_vue)
planner_tpl = extract_template(planner_vue)
targets_tpl = extract_template(targets_vue)
progress_tpl = extract_template(progress_vue)
settings_tpl = extract_template(settings_vue)
layout_tpl = extract_template(layout_vue)
login_tpl = extract_template(login_vue)
register_tpl = extract_template(register_vue)

# Convert to HTML
landing_html = vue_to_html(landing_tpl)
sanctuary_html = vue_to_html(sanctuary_tpl)
questionnaire_html = vue_to_html(questionnaire_tpl)
result_html = vue_to_html(result_tpl)
dashboard_html = vue_to_html(dashboard_tpl)
notes_html = vue_to_html(notes_tpl)
planner_html = vue_to_html(planner_vue)  # Use raw vue for planner
targets_html = vue_to_html(targets_tpl)
progress_html = vue_to_html(progress_tpl)
settings_html = vue_to_html(settings_tpl)
layout_html = vue_to_html(layout_tpl)
login_html = vue_to_html(login_tpl)
register_html = vue_to_html(register_tpl)

print("Templates extracted and converted")
print(f"Landing: {len(landing_html)} chars")
print(f"Sanctuary: {len(sanctuary_html)} chars")
print(f"Result: {len(result_html)} chars")
print(f"Dashboard: {len(dashboard_html)} chars")
print(f"Notes: {len(notes_html)} chars")
