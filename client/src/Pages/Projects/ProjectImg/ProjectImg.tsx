const ProjectImg: React.FC<{ path: string }> = ({ path = "https://placehold.co/450x200" }) => {
  return (
    <div className="relative w-full opacity-50 duration-300 ease-in-out hover:opacity-100">
      <img src={path} alt="" className="w-full rounded-t-lg" />
    </div>
  );
};

export default ProjectImg;
