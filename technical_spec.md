# Pizza Faucet Reimbursement System MVP

## Overview
Pizza Faucet is a dapp designed to facilitate the reimbursement of pizza purchases. The site will display posts from the Pizza Faucet Farcaster channel, allowing users to view and reimburse pizza purchases with USDC.

## Features

### Main Page
- **Post Feed**: A list of all posts from the Pizza Faucet Farcaster channel.
  - **Poster Information**: Display the user's Farcaster profile information.
  - **Post Content**: Show the text content of the post.
  - **Pizza Picture**: Display the image of the pizza.
  - **Reimbursement Status**: Indicate whether the post has been reimbursed or not.
  
### Reimbursement Flow
- **Reimburse Button**: Available for any user to start the reimbursement process.
- **Reimbursement Modal**: Upon clicking 'Reimburse', a modal will open for each post.
  - **Payment Interface**: Users can pay the poster (must have connected wallet to farc profile) in USDC through this modal.
  - **Completion Status**: Once payment is confirmed, update the post status to 'Reimbursed' in DB.

## Technical Specification

### Frontend
- **Framework**: Next.js for building the SPA.
- **Styling**: Tailwind CSS for component styling.

### Backend
- **API Integration**: 
  - **Neynar API**: Fetch posts from the Farcaster network.
  - **Data Storage**: 
    - **Vercel KV Store**: Track reimbursement status without a traditional database.

## Deployment
- **Hosting**: Vercel for frontend hosting and serverless backend functions.
