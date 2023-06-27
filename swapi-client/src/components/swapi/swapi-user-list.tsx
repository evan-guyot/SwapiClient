import SwapiUser from "@/components/swapi/swapi-user";

export default function SwapiUserList() {
  const users = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  return (
    users && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-gray-400 border-separate space-y-6 text-sm">
              <thead className="bg-gray-300 text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3 text-left">Height</th>
                  <th className="p-3 text-left">Birth Year</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return <SwapiUser userId={user.id} key={index} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
}
