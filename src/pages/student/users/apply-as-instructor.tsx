import { Users, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from "react";
import Veriff from "@/pages/student/users/veriff.tsx";
import api from "@/services/api.ts";

export default function ApplyAsInstructor() {
  const [sessionUrl, setSessionUrl] = useState<string | null>(null)

  const handleClickApply = async () => {
    try {
      const res = await api.post(
        "/users/me/apply-as-instructor",
        {},
        { withCredentials: true }
      )

      console.log("Response dari backend:", res.data)
      setSessionUrl(res.data.url)
    } catch (err) {
      console.error("Error apply-as-instructor:", err)
    }
  }

  return (
    <div className="min-h-screen bg-white/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Career opportunities
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join as an Instructor
          </h1>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            at SalingTau
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Express your passion for teaching and sharing knowledge. Help thousands of students achieve their dreams while building your own reputation.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="space-y-4 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-start space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Reach Thousands of Students
              </h3>
              <p className="text-gray-600 text-sm">
                Share your experience with a constantly growing community of learners
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-start space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Full Flexibility
              </h3>
              <p className="text-gray-600 text-sm">
                Set your own schedule and teaching materials according to your expertise
              </p>
            </div>
          </div>
        </div>

        {/* Requirements Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Basic Requirements</h3>
            </div>
            <p className="text-blue-50 text-sm mt-1">
              Please ensure your identity is verified to maintain platform security
            </p>
          </div>

          {/* Requirements List */}
          <div className="px-6 py-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Have expertise or experience in a specific field</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Able to communicate well in Indonesian</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Have valid identity (KTP/Passport)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Committed to providing quality teaching</span>
              </li>
            </ul>

            {/* Next Steps */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Next Step:</span> After submitting your application, the SalingTau team will guide you through the identity verification process via KTP/Passport.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button onClick={handleClickApply} className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-lg">
          <span>Apply Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {sessionUrl && <Veriff sessionUrl={sessionUrl} />}

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By applying, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}