// pages/api/sendSlackMessage.js
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req , res) {
  if (req.method === 'POST') {
    const { message } = await req.json();
    console.log(message);
    
    try {
      const response = await axios.post('https://slack.com/api/chat.postMessage', {
        channel: 'assignment', 
        text: message,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_TOKEN}`, 
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      // console.log(response);
      

      if (response.data.ok) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: response.data });
      }
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' });
  }
}
