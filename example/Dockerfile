# Use the official AWS Lambda Node.js base image
FROM amazon/aws-lambda-nodejs

# Copy function code
COPY index.js ${LAMBDA_TASK_ROOT}
COPY package*.json ${LAMBDA_TASK_ROOT}
COPY node_modules ${LAMBDA_TASK_ROOT}

# Install dependencies
RUN npm install

EXPOSE 8080

# Command to run the Lambda function
CMD ["index.handler"]
