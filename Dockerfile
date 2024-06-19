# Use the official AWS Lambda Node.js base image
FROM amazon/aws-lambda-nodejs

# Copy function code
COPY package*.json ${LAMBDA_TASK_ROOT}/
RUN npm install

# Copy rest of the application code
COPY . ${LAMBDA_TASK_ROOT}

# Set environment variable
ENV ENVIRONMENT=lambda
ENV SECRET_KEY=supersecretkey123456!@#

# Command to run the Lambda function
CMD ["app.handler"]
