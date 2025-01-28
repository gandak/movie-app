import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-screen flex justify-center bg-[#4338CA] mt-8">
      <div className=" max-w-[1280px] w-full h-[200px] gap-8 items-center py-10 flex justify-between text-[14px]">
        <div className="flex flex-col">
          <Image src="/logowhite.svg" alt="" width={92} height={20} />
          <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-[96px] text-white">
          <div className="flex flex-col gap-3">
            <p>Contact Information</p>
            <div className="flex  gap-3">
              <Image src="/email.svg" alt="" width={16} height={16} />
              <div>
                <p className="font-medium">Email</p>
                <p className="font-normal">support@movieZ.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Image src="/phone.svg" alt="" width={16} height={16} />
              <div>
                <p className="font-medium">Phone</p>
                <p className="font-normal">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Follow us</p>
            <div className="flex gap-3">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
