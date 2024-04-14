// components/Sidebar.js

const Sidebar = () => {
  return (
    <div className="bg-green-600 h-screen p-6">
      <div className="flex items-center justify-center mb-12">
        <div className="text-white text-2xl font-bold">
          EduCheck
        </div>
      </div>
      <div className="flex flex-col">
        <a href="#" className="text-white mb-6">
          Dashboard
        </a>
        <a href="#" className="text-white mb-6">
          Certifications
        </a>
        <a href="#" className="text-white mb-6">
          Roadmaps
        </a>
        <a href="#" className="text-white mb-6">
          Courses
        </a>
        <a href="#" className="text-white">
          Log out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
