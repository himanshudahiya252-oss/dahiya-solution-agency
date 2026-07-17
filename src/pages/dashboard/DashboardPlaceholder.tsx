export default function DashboardPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="w-16 h-16 bg-ds-graphite rounded-full border border-white/5 flex items-center justify-center mb-6">
        <div className="w-6 h-6 border-2 border-ds-smoke border-t-ds-white rounded-full animate-spin" />
      </div>
      <h1 className="text-2xl font-display font-bold text-ds-white mb-2">{title}</h1>
      <p className="text-ds-silver max-w-md">
        This module is currently initializing in the Dahiya Solution enterprise ecosystem. Features will be available shortly.
      </p>
    </div>
  );
}
