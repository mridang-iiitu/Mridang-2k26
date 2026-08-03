export default function Register() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Register for MRIDANG 2k26</h1>
          <p className="text-gray-400 text-lg">
            Fill in your details to participate in the fest
          </p>
        </section>

        <section className="bg-slate-900 rounded-xl p-8">
          <form className="space-y-6">
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="+91 1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">College/Institution</label>
              <input
                type="text"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="Enter your college name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Events (You can select multiple)</label>
              <select
                multiple
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:border-red-500"
                size="5"
              >
                <option>Hackathon</option>
                <option>Battle of Bands</option>
                <option>BGMI Tournament</option>
                <option>Dance Competition</option>
                <option>Drama Competition</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">Hold Ctrl (or Cmd on Mac) to select multiple events</p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
            >
              Complete Registration
            </button>

          </form>
        </section>

      </div>
    </main>
  );
}
