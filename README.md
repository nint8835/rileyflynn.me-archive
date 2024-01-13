# rileyflynn.me

## Archival information

To build this site, the following was done:

1. Install dependencies
   ```fish
   npm install
   ```
2. Build a copy of `terraform.tfstate`
   ```fish
   cd terraform
   terraform init
   terraform apply
   ```
3. Build the site with legacy cryptographic operations enabled
   ```fish
   NODE_OPTIONS=--openssl-legacy-provider npm run build
   ```
