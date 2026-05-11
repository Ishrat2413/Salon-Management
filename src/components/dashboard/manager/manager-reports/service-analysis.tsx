export default function ServiceAnalysisPage() {
  const services = [
    { name: "Hair Coloring", count: 45, revenue: 1253 },
    { name: "Hair Coloring", count: 45, revenue: 1253 },
    { name: "Hair Coloring", count: 45, revenue: 1253 },
    { name: "Hair Coloring", count: 45, revenue: 1253 },
  ];

  return (
    <div className='mx-auto w-full max-w-480 overflow-hidden rounded-[12px] border border-[#F1EAE3] bg-[#F9F9FB] p-4 sm:p-6 lg:p-8'>
      <div className='mb-6 sm:mb-8'>
        <h2 className='text-xl font-semibold sm:text-2xl'>Top Services</h2>
        <p className='text-sm text-gray-600 sm:text-base'>
          Most popular services this week
        </p>
      </div>

      <div className='space-y-4'>
        {services.map((service, i) => (
          <div
            key={i}
            className='flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 transition hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
            <div>
              <div className='font-medium text-gray-900'>{service.name}</div>
              <div className='text-sm text-gray-500'>
                {service.count} services
              </div>
            </div>
            <div className='text-left sm:text-right'>
              <div className='text-lg font-semibold text-pink-600 sm:text-xl'>
                +${service.revenue.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
