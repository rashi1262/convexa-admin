import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../common/siteConstants';
import { toast } from 'sonner';

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/agent/getAgentById/${id}`);
        setAgent(res.data);
      } catch (err) {
        console.error('Error fetching agent details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgent();
    }
  }, [id]);

  const handleOwnershipTransfer = async () => {
    setIsTransferring(true);
    try {
      const invitationLink = `https://convexa-ai.netlify.app/auth/${agent._id}?id=${agent.clientId._id}`;
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Agent Ownership Invitation</h2>
          <p>Hello ${agent.clientId.name},</p>
          <p><strong>${agent.partnerId.contactPerson}</strong> has invited you to take ownership of the agent <strong>${agent.name}</strong>.</p>
          <a href="${invitationLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
            Accept Invitation
          </a>
          <p style="margin-top: 20px; color: #555;">If you did not expect this invitation, you can ignore this email.</p>
        </div>
      `;

      await axios.post(`${BASE_URL}/mail/send`, {
        to: agent.clientId.email,
        subject: 'Agent Ownership Transfer Invitation',
        html: htmlContent,
      });

      toast.success('Ownership transferred and invitation sent!');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    } finally {
      setIsTransferring(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!agent) {
    return <div className="p-6 text-center text-red-500">Agent not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Agent Details</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {agent.name}</p>
          <p><strong>Website:</strong> {agent.website}</p>
          <p><strong>Created At:</strong> {new Date(agent.createdAt).toLocaleString()}</p>
          <p><strong>Ownership:</strong> {agent.isOwner ? 'Yes' : 'No'}</p>
        </div>

        {!agent.isOwner && (
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            onClick={handleOwnershipTransfer}
            disabled={isTransferring}
          >
            {isTransferring ? 'Transferring...' : 'Transfer Ownership'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentDetail;
