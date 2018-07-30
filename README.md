## A sample project to trigger a lamda function on creation of a resource in S3 bucket which processes the text.

-   Create a lambda function with S3 access.
-   Set aws credentials via aws cli: `aws configure`

---

-   Create a S3 bucket: `aws s3 mb s3://unique-name`
-   List all bucket items: `aws s3 ls s3://unique-name`
-   Upload/Copy a file to the bucket: `aws s3 cp sample.txt s3://unique-name`

---

-   Create a node.js project with a textReader.js file for processing the text
-   Zip your files, for ex: via powershell `Compress-Archive .\textReader.js lambdaFunc.zip`

---

-   Update your lambda function via `aws lambda update-function-code --zip-file=fileb://lambdaFunc.zip --function-name unique-name`
-   To change the handler `aws lambda update-function-configuration --function-name lambdaFunc --handler textReader.handler`
-   Note: One can also opt for a framework like AWS SAM, serverless, chalice, claudia.js etc.

---

-   In Lambda console _configure test events_ by creating a _s3 put_ event and update:
    a) s3 object's _key_ to your file name to be pushed in s3 bucket  
    b) s3 bucket's _arn_, _name_.  


