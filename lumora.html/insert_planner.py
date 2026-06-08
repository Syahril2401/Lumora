#!/usr/bin/env python3
"""Insert the complete planner section into the HTML file."""
import os

f = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\lumora-all-pages.html"
with open(f, 'r', encoding='utf-8') as fh:
    content = fh.read()

# Find insertion point (between dashboard end and targets start)
dashboard_end = content.find('</section>', content.find('<section id="page-dashboard"'))
dashboard_end += len('</section>')
targets_start = content.find('<section id="page-targets"')

print(f"Inserting planner between {dashboard_end} and {targets_start}")

# Read the planner HTML from the generate2.py output file
planner_file = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\planner_section.html"
if os.path.exists(planner_file):
    with open(planner_file, 'r', encoding='utf-8') as pf:
        planner_html = pf.read()
    print(f"Read planner from file: {len(planner_html)} chars")
else:
    print("Planner file not found, will generate inline")
    planner_html = ""

# Check if there's already a planner section between dashboard and targets
existing = content[dashboard_end:targets_start]
if 'page-planner' in existing:
    print("Found existing planner section, removing it")
    # Remove it
    p_start = existing.find('<section id="page-planner"')
    p_end = existing.rfind('</section>') + len('</section>')
    content = content[:dashboard_end] + existing[:p_start] + existing[p_end:] + content[targets_start:]
    # Recalculate positions
    dashboard_end = content.find('</section>', content.find('<section id="page-dashboard"'))
    dashboard_end += len('</section>')
    targets_start = content.find('<section id="page-targets"')

if not planner_html:
    # Generate the planner section inline (compact version)
    planner_html = open(r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\planner_section.html", 'r').read() if os.path.exists(r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\planner_section.html") else ""

if not planner_html:
    print("ERROR: No planner HTML available")
    exit(1)

# Insert the planner
content = content[:targets_start] + planner_html + content[targets_start:]

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(content)

size = os.path.getsize(f)
print(f"Done. File size: {size:,} bytes")

# Verify
with open(f, 'r', encoding='utf-8') as fh:
    c = fh.read()
import re
ids = re.findall(r'<section id="(page-[^"]+)"', c)
print(f"Page sections: {len(ids)}")
print(f"Planner daily: {'planner-view-daily' in c}")
print(f"Planner weekly: {'planner-view-weekly' in c}")
print(f"Planner monthly: {'planner-view-monthly' in c}")
print(f"No events: {'No events planned' in c}")
