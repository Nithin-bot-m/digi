import { Resend } from 'resend'

/**
 * Digi∞Artha — Lead Email Notification Service
 * Dispatches styled notifications to sudhanva@isdinfosolutions.com
 * Powered by Resend (https://resend.com)
 *
 * NOTE: API keys and sensitive environment variables are read exclusively
 * from process.env and never hardcoded in source code.
 */

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export interface LeadNotificationPayload {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  website?: string | null
  industry?: string | null
  topic?: string | null
  message?: string | null
  source?: string | null
  utm?: string | null
  ip?: string | null
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function generateLeadEmailHtml(lead: LeadNotificationPayload): string {
  const safeName = escapeHtml(lead.name)
  const safeEmail = escapeHtml(lead.email)
  const safeCompany = lead.company ? escapeHtml(lead.company) : null
  const safePhone = lead.phone ? escapeHtml(lead.phone) : null
  const safeWebsite = lead.website ? escapeHtml(lead.website) : null
  const safeIndustry = lead.industry ? escapeHtml(lead.industry) : null
  const safeTopic = lead.topic ? escapeHtml(lead.topic) : 'General Inquiry'
  const safeMessage = lead.message ? escapeHtml(lead.message).replace(/\n/g, '<br/>') : null
  const safeUtm = lead.utm ? escapeHtml(lead.utm) : null
  const safeSource = lead.source ? escapeHtml(lead.source) : 'website-contact'
  const receivedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #02A3FE 0%, #2E4BFE 50%, #7B3FFE 100%); padding: 32px 28px; text-align: left; }
    .header h1 { margin: 0 0 6px; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 500; }
    .content { padding: 28px; }
    .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; background: rgba(123, 63, 254, 0.2); border: 1px solid rgba(123, 63, 254, 0.4); color: #c4b5fd; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
    .table-details { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-details td { padding: 10px 12px; border-bottom: 1px solid #1e293b; font-size: 14px; }
    .table-details tr:last-child td { border-bottom: none; }
    .label { color: #94a3b8; width: 140px; font-weight: 600; }
    .value { color: #f8fafc; font-weight: 500; }
    .value a { color: #38bdf8; text-decoration: none; }
    .value a:hover { text-decoration: underline; }
    .message-box { background: #0b0f19; border: 1px solid #222f49; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #f1f5f9; }
    .btn-reply { display: inline-block; background: linear-gradient(135deg, #02A3FE 0%, #2E4BFE 100%); color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; margin-top: 8px; }
    .footer { padding: 20px 28px; background: #0c1220; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Digi∞Artha — New Inbound Lead</h1>
      <p>A new prospect has submitted their details via Digi∞Artha</p>
    </div>
    <div class="content">
      <div class="badge">${safeTopic}</div>

      <table class="table-details">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
        </tr>
        ${
          safePhone
            ? `<tr>
          <td class="label">Phone</td>
          <td class="value"><a href="tel:${safePhone}">${safePhone}</a></td>
        </tr>`
            : ''
        }
        ${
          safeCompany
            ? `<tr>
          <td class="label">Company</td>
          <td class="value">${safeCompany}</td>
        </tr>`
            : ''
        }
        ${
          safeWebsite
            ? `<tr>
          <td class="label">Website</td>
          <td class="value"><a href="${safeWebsite.startsWith('http') ? safeWebsite : `https://${safeWebsite}`}" target="_blank" rel="noopener noreferrer">${safeWebsite}</a></td>
        </tr>`
            : ''
        }
        ${
          safeIndustry
            ? `<tr>
          <td class="label">Industry</td>
          <td class="value">${safeIndustry}</td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Interest / Topic</td>
          <td class="value">${safeTopic}</td>
        </tr>
      </table>

      ${
        safeMessage
          ? `<div style="margin-bottom: 8px; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Message / Brief</div>
             <div class="message-box">${safeMessage}</div>`
          : ''
      }

      <div style="text-align: center; margin: 28px 0 12px;">
        <a href="mailto:${safeEmail}?subject=Re:%20Digi%E2%88%9EArtha%20Inquiry%20-%20${encodeURIComponent(safeTopic)}" class="btn-reply">
          Reply Directly to ${safeName} &rarr;
        </a>
      </div>
    </div>

    <div class="footer">
      <strong>Submission Metadata:</strong><br/>
      Received: ${receivedAt} IST<br/>
      Source: ${safeSource}${safeUtm ? ` | UTM: ${safeUtm}` : ''}
    </div>
  </div>
</body>
</html>
`
}

export async function sendLeadNotificationEmail(lead: LeadNotificationPayload): Promise<{
  success: boolean
  id?: string
  error?: string
}> {
  const recipient = process.env.LEAD_RECIPIENT_EMAIL || 'sudhanva@isdinfosolutions.com'
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Digi∞Artha Leads <onboarding@resend.dev>'

  if (!resend) {
    console.warn(
      '[Resend Email] RESEND_API_KEY environment variable is not configured. Email notification skipped.',
    )
    return {
      success: false,
      error: 'RESEND_API_KEY is not configured',
    }
  }

  const subjectCompany = lead.company ? ` (${lead.company})` : ''
  const subjectTopic = lead.topic ? ` — ${lead.topic}` : ''
  const subject = `🚀 New Lead: ${lead.name}${subjectCompany}${subjectTopic}`

  try {
    let data = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: lead.email,
      subject,
      html: generateLeadEmailHtml(lead),
    })

    // If using the default Resend testing domain (onboarding@resend.dev), Resend restricts
    // recipients to the verified account owner until a custom domain is verified at resend.com/domains.
    if (
      data.error &&
      typeof data.error.message === 'string' &&
      data.error.message.includes('You can only send testing emails to your own email address')
    ) {
      const match = data.error.message.match(/\(([^\)]+)\)/)
      const ownerEmail = match ? match[1].trim() : null
      if (ownerEmail && ownerEmail !== recipient) {
        console.warn(
          `[Resend Sandbox Fallback] Resend sandbox restricted ${recipient}. Retrying delivery to registered account owner (${ownerEmail}). To deliver directly to ${recipient}, verify your domain at https://resend.com/domains.`,
        )
        data = await resend.emails.send({
          from: fromAddress,
          to: [ownerEmail],
          replyTo: lead.email,
          subject: `${subject} [Forwarded to Account Owner]`,
          html: generateLeadEmailHtml(lead),
        })
      }
    }

    if (data.error) {
      console.error('[Resend Email Error]', data.error)
      return { success: false, error: data.error.message }
    }

    console.log(
      `[Resend Email Sent] Lead notification sent successfully (Email ID: ${data.data?.id})`,
    )
    return { success: true, id: data.data?.id }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('[Resend Email Exception]', errorMsg)
    return { success: false, error: errorMsg }
  }
}
