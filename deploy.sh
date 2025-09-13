#!/bin/bash

# AI Student Lab - Quick Deploy Script
# Run this after making changes to update your live website

echo "🚀 Deploying AI Student Lab website..."

# Add all changes
git add .

# Commit with current date
COMMIT_MSG="Update $(date +'%Y-%m-%d %H:%M')"
git commit -m "$COMMIT_MSG"

# Push to main branch
git push origin main

echo "✅ Website updated successfully!"
echo "🌐 Your site will be live at: https://aistudentlab.com"
echo "⏱️  Updates usually take 1-2 minutes to appear online"
