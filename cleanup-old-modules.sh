#!/bin/bash

# Script to remove old shared modules

echo "Removing old shared module files..."

# Remove old Redis module
rm -rf /Users/user/Coding/registon/apps/gateway/src/modules/v1/redis

# Remove old Branch module
rm -rf /Users/user/Coding/registon/apps/gateway/src/modules/v1/branch

# Remove old City module
rm -rf /Users/user/Coding/registon/apps/gateway/src/modules/v1/city

# Remove old External module
rm -rf /Users/user/Coding/registon/apps/gateway/src/modules/v1/external

echo "Old module files removed successfully!"
