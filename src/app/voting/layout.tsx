export default function VotingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #FFF 0%, #D2E6FD 50%, #FFF 100%)',
        minHeight: 'screen',
      }}
      className="min-h-screen"
    >
      {children}
    </section>
  );
}
