const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-5 lg:mx-20 2xl:mx-0">
      {children}
    </main>
  );
};

export default Container;
