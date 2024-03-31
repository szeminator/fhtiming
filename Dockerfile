FROM nginx:alpine
COPY /dist /usr/share/nginx/html
EXPOSE 80

# Step 5: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
