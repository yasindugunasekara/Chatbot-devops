# 🤖 Next.js AI Chatbot on AWS EKS

A modern AI chatbot application built with Next.js and powered by the DeepSeek API. This repository not only contains the application code but also a complete DevOps toolchain including Docker containerization, Terraform infrastructure-as-code (AWS ECR, VPC, EKS), and Kubernetes deployment manifests.

---

## 🏗️ Architecture & Tech Stack

### Application
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [DeepSeek API](https://deepseek.com/) (using the OpenAI SDK)

### DevOps & Infrastructure
- **Containerization**: Docker (Optimized multi-stage builds)
- **Infrastructure as Code**: Terraform (AWS Provider)
- **Cloud Provider**: Amazon Web Services (AWS)
  - Elastic Container Registry (ECR)
  - Virtual Private Cloud (VPC)
  - Elastic Kubernetes Service (EKS)
- **Orchestration**: Kubernetes (Deployments & LoadBalancer Services)

---

## ✨ Features

- **Interactive UI**: Clean, responsive chat interface built with Next.js and Tailwind CSS.
- **AI Powered**: Seamless integration with DeepSeek for intelligent conversations.
- **Scalable Infrastructure**: Automatically provisioned AWS EKS cluster using Terraform.
- **Production Ready**: Multi-stage Dockerfile optimized for Next.js standalone output.
- **High Availability**: Kubernetes deployment with multiple replicas and a LoadBalancer.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v20+)
- npm, yarn, or pnpm
- A DeepSeek API Key

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/chatbot-devops.git
cd chatbot-devops
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your DeepSeek API key:
```env
DEEPSEEK_API_KEY=your_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🐳 Docker Build

To build the Docker image locally, you need to pass the DeepSeek API key as a build secret:

```bash
# Save your key to a file
echo "your_api_key_here" > api_key.txt

# Build the image using Docker BuildKit secrets
docker build --secret id=deepseek_key,src=api_key.txt -t my-chat-app:latest .
```

---

## ☁️ Infrastructure Setup (Terraform)

The `aws-infrastructure` folder contains the Terraform configuration to provision the required AWS resources.

### Prerequisites
- [Terraform](https://developer.hashicorp.com/terraform/install) installed
- AWS CLI configured with appropriate credentials

### Steps
1. Navigate to the infrastructure directory:
   ```bash
   cd aws-infrastructure
   ```
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Review the infrastructure plan:
   ```bash
   terraform plan
   ```
4. Apply the configuration (this will create an ECR repo, VPC, and EKS cluster):
   ```bash
   terraform apply
   ```

---

## ☸️ Kubernetes Deployment

Once your EKS cluster is up and your Docker image is pushed to the ECR repository, you can deploy the application.

1. **Update kubeconfig** to interact with your new EKS cluster:
   ```bash
   aws eks update-kubeconfig --region us-east-1 --name chat-app-cluster
   ```

2. **Create the Secret** for the DeepSeek API key:
   ```bash
   kubectl create secret generic deepseek-secret --from-literal=DEEPSEEK_API_KEY='your_api_key_here'
   ```

3. **Apply the Kubernetes manifests**:
   ```bash
   kubectl apply -f k8s-manifest.yaml
   ```

4. **Access the Application**:
   Get the external IP of the LoadBalancer:
   ```bash
   kubectl get services chat-app-service
   ```
   Navigate to the provided external IP in your browser!

---


