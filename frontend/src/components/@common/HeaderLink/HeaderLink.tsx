import { useNavigate } from 'react-router-dom';

interface IHeaderLinkProps {
  label: string;
  link: string;
  isClicked: boolean;
}

const HeaderLink = ({ label, link, isClicked }: IHeaderLinkProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`mx-1 p-2 text-sm cursor-pointer rounded-md hover:bg-gray-100/80 ${isClicked ? 'text-[#5A8AF2]' : ''}`}
      onClick={() => navigate(link)}
    >
      {label}
    </div>
  );
};

export default HeaderLink;
