import { Table } from "reactstrap";

export const DescriptionTable = ({ latitude, longitude, date, desc }) => {
  const now = new Date();
  const dateValue = date ? date : `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()
    }:${now.getMinutes()}`

  return (
    <>
      <Table striped variant="dark" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>Creator</td>
            <td>Dave</td>
          </tr>
          <tr>
            <td>Creation Date</td>
            <td>{dateValue}</td>
          </tr>
          <tr>
            <td>Source</td>
            <td>Drone</td>
          </tr>
          <tr>
            <td>Lat</td>
            <td>{latitude && latitude}</td>
          </tr>
          <tr>
            <td>Long</td>
            <td>{longitude && longitude}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{desc && desc}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
};