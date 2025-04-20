const ProjectImg: React.FC<{ path: string }> = ({ path = "https://placehold.co/450x200" }) => {
  return (
    <div>
      <img src={path} alt="" className="rounded-t-lg" />
    </div>
  );
};

export default ProjectImg;
