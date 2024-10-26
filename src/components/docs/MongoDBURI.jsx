import React from 'react';

function MongoDBURI() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">MongoDB URI</h2>

      <p>
        The MongoDB URI is a connection string that allows your application to communicate with your MongoDB database. It's essential for storing and retrieving data related to your certificate generation process.
      </p>

      <h3 className="text-xl font-semibold mt-4">How to Obtain Your MongoDB URI</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          Log in to your MongoDB Atlas account (or your MongoDB server).
        </li>
        <li>
          Select the project containing your database cluster.
        </li>
        <li>
          Click on the “Connect” button for your cluster.
        </li>
        <li>
          Choose the connection method you prefer (e.g., Connect your application).
        </li>
        <li>
          Copy the connection string provided. It typically looks like:
          <pre className="bg-gray-100 p-2 rounded-md">
            mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
          </pre>
        </li>
        <li>
          Replace <code>username</code> and <code>password</code> with your actual MongoDB credentials.
        </li>
        <li>
          Ensure the database name in the URI matches the database you want to connect to.
        </li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Example of a MongoDB URI</h3>
      <p>
        A sample MongoDB URI might look like this:
        <pre className="bg-gray-100 p-2 rounded-md">
          mongodb+srv://user123:pass456@mycluster.mongodb.net/certificates?retryWrites=true&w=majority
        </pre>
      </p>

      <h3 className="text-xl font-semibold mt-4">Constructing a MongoDB Connection String</h3>
      <h4 className="text-lg font-semibold mt-2">1. Understanding the Connection String Structure</h4>
      <p>
        A MongoDB connection string generally follows this structure:
      </p>
      <pre className="bg-gray-100 p-2 rounded-md">
        mongodb+srv://&lt;username&gt;:&lt;password&gt;@&lt;cluster-address&gt;/&lt;options&gt;
      </pre>

      <h4 className="text-lg font-semibold mt-2">2. Step-by-Step Guide to Create Your Connection String</h4>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          Log in to MongoDB Atlas and select your project and cluster.
        </li>
        <li>
          Click on the “Connect” button and choose “Connect your application.”
        </li>
        <li>
          Copy the provided connection string, which will look something like:
          <pre className="bg-gray-100 p-2 rounded-md">
            mongodb+srv://username:password@cluster0.dcodo.mongodb.net/test?retryWrites=true&w=majority
          </pre>
        </li>
        <li>
          Replace <code>&lt;username&gt;</code> and <code>&lt;password&gt;</code> with your actual credentials.
        </li>
        <li>
          Optionally, specify a database name in the URI:
          <pre className="bg-gray-100 p-2 rounded-md">
            mongodb+srv://username:password@cluster0.dcodo.mongodb.net/&lt;database&gt;?retryWrites=true&w=majority
          </pre>
        </li>
        <li>
          Add additional options if needed:
          <pre className="bg-gray-100 p-2 rounded-md">
            mongodb+srv://username:password@cluster0.dcodo.mongodb.net/&lt;database&gt;?retryWrites=true&w=majority&appName=Cluster0
          </pre>
        </li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Important Security Considerations</h3>
      <p>
        Keep your MongoDB URI secure. Avoid hardcoding sensitive information directly into your application code. Use environment variables or secure configuration methods to manage sensitive credentials.
      </p>

      <h3 className="text-xl font-semibold mt-4">Using the MongoDB URI in Your Application</h3>
      <p>
        Typically, you will use this URI in your backend code to establish a connection to the MongoDB database. Ensure that your application has the necessary permissions and access to the database specified in the URI.
      </p>
    </div>
  );
}

export default MongoDBURI;
