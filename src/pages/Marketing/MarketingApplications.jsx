import React, { useState, useEffect } from "react";
import useReq from "../../hooks/useReq";
import Spinner from "../../components/Spinner";

function MarketingApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState(null);
  const { sendRequest } = useReq();

  const load = () => {
    setLoading(true);
    sendRequest("marketing/applications", "GET", null, (err, res) => {
      setLoading(false);
      if (err) { console.error(err); return; }
      setApplications(res.data ?? []);
    });
  };

  useEffect(() => { load(); }, []);

  const review = (applicationId, decision, reason = "") => {
    setActing(applicationId + decision);
    sendRequest("marketing/applications/review", "POST", { application_id: applicationId, decision, reason }, (err, res) => {
      setActing(null);
      if (err) { alert(err.response?.data?.message || "Action failed"); return; }
      alert(res.data?.message || "Done");
      load();
    });
  };

  const handleReject = (app) => {
    const reason = window.prompt(`Rejection reason for ${app.marketing_company_name || app.email}:`);
    if (reason === null) return;
    review(app._id, "rejected", reason);
  };

  if (loading) return <div className="p-6"><Spinner /></div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Marketing Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and approve marketer/manufacturer access requests. {applications.length} pending.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No pending applications</p>
          <p className="text-sm mt-1">New applications will appear here when marketers apply at kwkpos.com</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {app.marketing_company_name || "Unknown Company"}
                    </h3>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                      Pending Review
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {app.first_name} {app.last_name} &middot; {app.email} &middot; {app.phone_no}
                  </p>
                  {app.marketing_website && (
                    <a href={app.marketing_website} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline mt-0.5 block">
                      {app.marketing_website}
                    </a>
                  )}
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {app.marketing_brands && (
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brands Represented</span>
                        <p className="text-sm text-gray-700 mt-0.5">{app.marketing_brands}</p>
                      </div>
                    )}
                    {app.marketing_use_case && (
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Use Case</span>
                        <p className="text-sm text-gray-700 mt-0.5">{app.marketing_use_case}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Unknown"}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => review(app._id, "approved")}
                    disabled={!!acting}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
                  >
                    {acting === app._id + "approved" ? "Approving…" : "✓ Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(app)}
                    disabled={!!acting}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 border border-red-200 text-sm font-medium rounded-lg transition"
                  >
                    {acting === app._id + "rejected" ? "Rejecting…" : "✕ Reject"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketingApplications;
