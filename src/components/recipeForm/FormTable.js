import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/Table";
import TableHead from "@material-ui/core/Table";
import TableRow from "@material-ui/core/Table";
import TableCell from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

const tableStyle = {
    width: '400px'
}

const FormTable = ({ values = { grains_list: [] } }) => (
  <Paper>
    <Table style={tableStyle}>
        <TableHead>
            <TableRow>
                <TableCell>Grain Type</TableCell>
                <TableCell>Grain Amount</TableCell>
            </TableRow>
        </TableHead>
      <TableBody>
        {values.grains_list.map(n => {
          return (
            <TableRow key={`${n.type}`}>
              <TableCell>{n.type}</TableCell>
              <TableCell>{n.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

export default connect(state => ({
  values: getFormValues("NewRecipe")(state)
}))(FormTable);