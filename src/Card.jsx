export default function Card({ data, author }) {
  return (
    <div className="p-4  bg-white shadow-xl md:flex-[32%_0_1]">
      <h1 className=" text-blue-700 text-3xl leading-7">{data.title}</h1>
      <p className="text-lg leading-6 mt-4">{data.body}</p>
      <p className="text-gray-400 mt-4">{author.name}</p>
    </div>
  );
}
