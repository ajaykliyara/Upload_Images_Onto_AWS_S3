# CS31 : Graduate Credit Assignment : File upload to AWS S3 using Multer S3

The objective of this project was to highlight important steps involved in using Multer S3 module to upload files on to Amazon S3 Buckets.
Benefits of this approach are many, couple of them being,
1. The image on S3 is accessed via a secure URL (https), which allows for using them on hosting environments like 'StackBlitz' (A problem I faced with StackBlitz with Assignment 6)
2. A scalable service and these resources could be accessed by other applications as well.

### Simple App hosted on Digital Ocean
http://174.138.49.83:3000/

### Setting up AWS
1. Create an [S3 bucket](https://s3.console.aws.amazon.com/s3/home?region=us-east-1)
2. Once created, go to Permissions/CORS Configuration tab, make entry

      " <AllowedMethod>POST</AllowedMethod> "

   This sets the necessary permission for uploading a file from the Node application on to the S3 bucket.
3. Create a [IAM User](https://console.aws.amazon.com/iam/home?region=us-east-1#/users) and make sure you attach the user a policy of 'AmazonS3FullAccess' and save the resulting Access key and Secret key.

### Using Multer S3

1. The application requires 'multer-s3' - to handle multi part form submits to S3 buckets and also requires the AWS SDK which is available through npm package 'aws-sdk'. These modules need to be
installed using 'npm install --save <package name>'
2. Create a config file of format .json which hosts AWS credentials. Please make sure you add this file to .gitignore to avoid pushing it into public domain.

```
{
    "accessKeyId": "YOUR_ACCESS_KEY",
     "secretAccessKey": "YOUR_SECRET_KEY",
    "region": "us-east-1"
}

```
3. Invoke multer which further using multer s3 to set storage.

```
const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: "YOUR_S3_BUCKETNAME",
        key: function (req, file, cb) {
            console.log(file);
            var img_array = file.originalname.split("."); // comes from form
            cb(null, img_array[0] + "-" + Date.now() + "." + img_array[1]);
        }
    })
});

```

4. Please refer to code/comments in the git repository for a sample application which
accepts an image from the user and uploads to AWS S3 and goes on to display the same image.

Please note error handling is very minimal, the objective was to demonstrate using multer s3 to upload images onto AWS S3.
