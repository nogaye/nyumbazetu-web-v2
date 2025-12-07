# Supabase MCP Setup Guide

This guide will help you set up the Supabase Model Context Protocol (MCP) server in Cursor, which allows the AI assistant to directly interact with your Supabase projects.

## What is Supabase MCP?

Supabase MCP enables the AI assistant to:
- List and manage your Supabase projects
- Execute SQL queries and migrations
- Manage database tables and schemas
- Deploy Edge Functions
- View logs and advisors
- Generate TypeScript types
- And much more!

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Cursor IDE installed
- A Supabase access token (we'll create this in Step 1)

## Step 1: Generate a Supabase Access Token

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Log in to your account

2. **Navigate to Access Tokens**
   - Click on your profile icon (top right)
   - Select **Account Settings** or go directly to: https://supabase.com/dashboard/account/tokens

3. **Create a New Token**
   - Click **Generate New Token**
   - Give it a descriptive name (e.g., "Cursor MCP Access Token")
   - Set an expiration date (or leave blank for no expiration)
   - Click **Generate Token**

4. **Copy the Token**
   - ⚠️ **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - Store it securely (we'll use it in Step 3)

## Step 2: Open Cursor Settings

1. **Open Cursor Settings**
   - Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux)
   - Or go to: **Cursor → Settings** (Mac) or **File → Preferences → Settings** (Windows/Linux)

2. **Navigate to MCP Settings**
   - In the settings search bar, type: `mcp`
   - Look for **"MCP"** or **"Model Context Protocol"** settings
   - Or manually navigate to the MCP configuration section

## Step 3: Configure Supabase MCP Server

1. **Add MCP Server Configuration**
   - In Cursor settings, find the MCP servers configuration
   - Click **Add Server** or **Edit Configuration**

2. **Add Supabase MCP Configuration**
   
   Add the following configuration to your MCP servers list:

   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": [
           "-y",
           "@supabase/mcp-server-supabase"
         ],
         "env": {
           "SUPABASE_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE"
         }
       }
     }
   }
   ```

   Replace `YOUR_ACCESS_TOKEN_HERE` with the token you copied in Step 1.

3. **Alternative: Using Cursor Settings UI**
   - If Cursor has a UI for MCP configuration:
     - Server Name: `supabase`
     - Command: `npx`
     - Arguments: `-y`, `@supabase/mcp-server-supabase`
     - Environment Variables:
       - Key: `SUPABASE_ACCESS_TOKEN`
       - Value: `[paste your token here]`

## Step 4: Restart Cursor

1. **Close and Reopen Cursor**
   - Completely quit Cursor (not just close the window)
   - Reopen Cursor and your project

2. **Verify MCP Connection**
   - The AI assistant should now be able to access Supabase MCP tools
   - You can test by asking: "List my Supabase projects"

## Step 5: Verify Setup

To verify that Supabase MCP is working:

1. **Ask the AI to list your projects**
   - Try: "What Supabase projects do I have?"
   - Or: "List my Supabase projects"

2. **Check for MCP Resources**
   - The AI should be able to see your Supabase projects
   - If it can't, check the configuration again

## Troubleshooting

### MCP Server Not Found

**Problem**: Cursor can't find the Supabase MCP server

**Solutions**:
- Make sure you have Node.js installed (required for `npx`)
- Try using the full path to npx: `/usr/local/bin/npx` or `C:\Program Files\nodejs\npx.cmd`
- Check that your internet connection is working (npx downloads the package on first use)

### Access Token Invalid

**Problem**: Getting authentication errors

**Solutions**:
- Verify your access token is correct (no extra spaces)
- Check that the token hasn't expired
- Generate a new token and update the configuration
- Make sure the environment variable name is exactly `SUPABASE_ACCESS_TOKEN`

### MCP Server Not Loading

**Problem**: MCP server doesn't appear to be working

**Solutions**:
- Check Cursor's developer console for errors (Help → Toggle Developer Tools)
- Verify the JSON configuration is valid
- Try restarting Cursor completely
- Check Cursor's MCP logs (if available in settings)

### Can't Find MCP Settings

**Problem**: Can't locate MCP configuration in Cursor

**Solutions**:
- Make sure you're using a recent version of Cursor (MCP support may require a specific version)
- Check Cursor's documentation for MCP setup
- Look for "Extensions" or "Integrations" settings instead
- MCP configuration might be in a separate config file (see Step 6)

## Step 6: Manual Configuration File (Alternative)

If Cursor uses a configuration file for MCP:

1. **Locate Cursor Config File**
   - Mac: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
   - Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
   - Linux: `~/.config/Cursor/User/globalStorage/mcp.json`

2. **Edit the Config File**
   - Open the file in a text editor
   - Add the Supabase MCP configuration as shown in Step 3
   - Save the file

3. **Restart Cursor**

## Security Best Practices

1. **Token Security**
   - Never commit your access token to version control
   - Use environment variables or secure storage
   - Rotate tokens periodically
   - Use tokens with minimal required permissions

2. **Token Scope**
   - The access token should have permissions to:
     - Read project information
     - Execute SQL queries
     - Manage database schemas
     - Access logs (if needed)

3. **Project Access**
   - The token will have access to all projects in your Supabase account
   - Consider creating a separate Supabase account for development if needed

## What You Can Do With Supabase MCP

Once set up, you can ask the AI to:

- ✅ List your Supabase projects
- ✅ Get project details and URLs
- ✅ Execute SQL queries
- ✅ Create and apply migrations
- ✅ List database tables
- ✅ Generate TypeScript types
- ✅ Deploy Edge Functions
- ✅ View project logs
- ✅ Check security and performance advisors
- ✅ Manage development branches
- ✅ And much more!

## Example Commands

After setup, try these commands:

- "List my Supabase projects"
- "Show me the tables in my project [project-id]"
- "Generate TypeScript types for my Supabase project"
- "Execute this SQL query: SELECT * FROM properties LIMIT 5"
- "Check for security advisors in my project"

## Next Steps

1. **Test the Connection**: Ask the AI to list your projects
2. **Set Up Your Project**: If you haven't already, follow `SUPABASE_SETUP.md` to set up your database
3. **Start Using MCP**: Ask the AI to help with database operations, migrations, etc.

## Support

- **Supabase MCP Documentation**: Check Supabase's MCP documentation
- **Cursor MCP Docs**: Check Cursor's documentation on MCP
- **Supabase Support**: https://supabase.com/support

---

**Note**: The exact steps may vary slightly depending on your Cursor version. If you encounter issues, check Cursor's latest documentation for MCP setup.

