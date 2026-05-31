#!/usr/bin/env bash
set -e

# Replace these values before using this script.
REMOTE_USER="root"
REMOTE_HOST="your-server-ip"
REMOTE_DIR="/var/www/your-blog"

echo "1. Building project..."
npm run build

echo "2. Preparing remote directory..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR} && rm -rf ${REMOTE_DIR}/*"

echo "3. Uploading dist files..."
scp -r dist/* "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"

echo "4. Fixing permissions and reloading Nginx..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" "
find ${REMOTE_DIR} -type d -exec chmod 755 {} \;
find ${REMOTE_DIR} -type f -exec chmod 644 {} \;
systemctl reload nginx
"

echo "Done. Open your website in the browser."
