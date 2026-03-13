import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = request.nextUrl.pathname.replace('/api/proxy/', '');
  
  const backendUrl = `http://cpsy300-backend-alb-355541218.us-east-2.elb.amazonaws.com/${path}${request.nextUrl.search}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: request.body,
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Backend unavailable' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = request.nextUrl.pathname.replace('/api/proxy/', '');
  
  const backendUrl = `http://cpsy300-backend-alb-355541218.us-east-2.elb.amazonaws.com/${path}${request.nextUrl.search}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: await request.text(),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Backend unavailable' },
      { status: 500 }
    );
  }
}



