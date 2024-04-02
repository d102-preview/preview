interface ISpeechBubbleProps {
  children: React.ReactNode;
}

const SpeechBubble = ({ children }: ISpeechBubbleProps) => {
  return (
    <div className="py-3">
      <div className="w-full relative bg-[#ECF2FF] p-4 rounded-xl text-lg">
        <div className="absolute bg-inherit h-5 w-5 rotate-45 transform origin-bottom-right -translate-y-1/2 left-8 top-1 rounded"></div>
        <div className="text-UNIMPORTANT_TEXT mx-3">{children}</div>
      </div>
    </div>
  );
};

export default SpeechBubble;
