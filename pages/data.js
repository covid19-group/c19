import PageLayout from '../components/PageLayout';

export default function Data() {
  return (
    <PageLayout>
      <div className="w-full relative overflow-hidden sm:border sm:border-gray-100 sm:shadow-lg sm:rounded-lg overflow-y-hidden">
        <div className="min-h-screen -mt-12 relative">
          <iframe
            className="relative min-h-screen"
            src="https://app.powerbi.com/view?r=eyJrIjoiNzI4NDk3NzEtODU0Ny00YTgyLTg0MDEtOThjNDkwYmU5MWY1IiwidCI6ImIyNzIzOWVhLTNhODUtNDU1Yi1hNDJmLTBmZTFjOWY4ZmExMiIsImMiOjl9"
            width="100%"
            height="100%"
            style={{
              background: 'transparent',
              border: 'none',
              top: '37px',
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
