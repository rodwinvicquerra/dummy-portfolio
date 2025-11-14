import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

/**
 * MCP (Model Context Protocol) API Endpoint
 * OAuth-protected endpoint for MCP integration
 * 
 * Security Features:
 * - OAuth token validation via Clerk
 * - Rate limiting (handled by Arcjet middleware)
 * - Request logging and monitoring
 */

// Mock MCP tools/resources - replace with your actual MCP implementation
const MCP_TOOLS = [
  {
    name: 'portfolio_data',
    description: 'Get portfolio information',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: ['about', 'skills', 'projects', 'experience', 'education'],
          description: 'Portfolio section to retrieve'
        }
      },
      required: ['section']
    }
  },
  {
    name: 'contact_form',
    description: 'Submit contact form',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        message: { type: 'string' }
      },
      required: ['name', 'email', 'message']
    }
  }
]

/**
 * GET /api/mcp
 * List available MCP tools and capabilities
 */
export async function GET(req: NextRequest) {
  try {
    // Validate OAuth token via Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'Unauthorized', 
          message: 'Valid OAuth token required',
          code: 'AUTH_REQUIRED'
        },
        { status: 401 }
      )
    }

    // Log successful authentication
    console.log(`[MCP] Authenticated request from user: ${userId}`)

    // Return MCP server information
    return NextResponse.json({
      protocolVersion: '2024-11-05',
      serverInfo: {
        name: 'Rodwin Portfolio MCP Server',
        version: '1.0.0',
        description: 'OAuth-protected MCP server for portfolio data access'
      },
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      },
      tools: MCP_TOOLS,
      authenticated: true,
      userId: userId
    })

  } catch (error) {
    console.error('[MCP] Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: 'Failed to process MCP request'
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mcp
 * Execute MCP tool calls
 */
export async function POST(req: NextRequest) {
  try {
    // Validate OAuth token
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Valid OAuth token required',
          code: 'AUTH_REQUIRED'
        },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { tool, arguments: toolArgs } = body

    // Log the request
    console.log(`[MCP] Tool execution request:`, {
      userId,
      tool,
      timestamp: new Date().toISOString()
    })

    // Validate tool exists
    const toolExists = MCP_TOOLS.find(t => t.name === tool)
    if (!toolExists) {
      return NextResponse.json(
        {
          error: 'Tool Not Found',
          message: `Tool '${tool}' does not exist`,
          availableTools: MCP_TOOLS.map(t => t.name)
        },
        { status: 404 }
      )
    }

    // Execute tool (mock implementation - replace with actual logic)
    let result
    switch (tool) {
      case 'portfolio_data':
        result = {
          section: toolArgs.section,
          data: `Mock data for ${toolArgs.section} section`,
          timestamp: new Date().toISOString()
        }
        break
      
      case 'contact_form':
        result = {
          success: true,
          message: 'Contact form submitted successfully',
          submittedData: toolArgs
        }
        break
      
      default:
        result = { error: 'Tool not implemented' }
    }

    return NextResponse.json({
      success: true,
      tool,
      result,
      executedBy: userId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('[MCP] Tool execution error:', error)
    return NextResponse.json(
      {
        error: 'Execution Failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/mcp
 * CORS preflight handler
 */
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
