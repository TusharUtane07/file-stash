import { EmailTemplate } from './../../_components/Email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req:any) {

  const response:any = await req.json();

  try {
    const data = await resend?.emails?.send({
      from: 'filestash@resend.dev',
      to: [response?.emailToSend],
      subject: response?.userName+ '  Shared file with you',
      react: EmailTemplate({ response }) as React.ReactElement,
    } );

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
