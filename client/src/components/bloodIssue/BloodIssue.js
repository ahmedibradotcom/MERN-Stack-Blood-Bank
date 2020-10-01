import React, { useState, useEffect } from 'react';
import BloodIssueForm from './BloodIssueForm';
import BloodIssueList from './BloodIssueList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBloodIssues,
  addBloodIssue,
  deleteBloodIssue,
} from '../../actions/bloodIssue';
import {
  getBloodRequests,
  updateBloodRequest,
} from '../../actions/bloodRequest';
import { getBloodStores, updateBloodStore } from '../../actions/bloodStore';
import Spinner from '../layout/Spinner';

const initialValues = {
  patient: '',
  plasma: '',
  platelet: '',
  rbc: '',
  wb: '',
};

function BloodIssue({
  bloodIssues: { loading, bloodIssues },
  deleteBloodIssue,
  getBloodIssues,
  addBloodIssue,
  getBloodRequests,
  updateBloodRequest,
  bloodRequests,
  getBloodStores,
  updateBloodStore,
  bloodStores,
  match,
}) {
  const [values, setValues] = useState(initialValues);
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    setValues({
      ...values,
      _id: e._id,
      patient: e.patient,
      plasma: e.plasma,
      platelet: e.platelet,
      rbc: e.rbc,
      wb: e.wb,
    });
    setEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(values);

    if (values.plasma !== '' && values.platelet !== '') {
      return console.log('Please, select only one option at atime');
    }
    if (values.plasma !== '' && values.rbc !== '') {
      return console.log('Please, select only one option at atime');
    }
    if (values.plasma !== '' && values.wb !== '') {
      return console.log('Please, select only one option at atime');
    }
    if (values.platelet !== '' && values.rbc !== '') {
      return console.log('Please, select only one option at atime');
    }
    if (values.platelet !== '' && values.wb !== '') {
      return console.log('Please, select only one option at atime');
    }
    if (values.rbc !== '' && values.wb !== '') {
      return console.log('Please, select only one option at atime');
    }

    // Plasma
    if (values.plasma !== '') {
      bloodRequests.map((request) => {
        if (
          request.blood_component[0].plasma > 0 &&
          request._id === blood_request_id
        ) {
          const subtractedPlasma =
            parseInt(request.blood_component[0].plasma) - 1;
          const newPlasma = {
            _id: request._id,
            blood_group: request.blood_group,
            patient_id: request.patient_id,
            patient_name: request.patient_name,
            plasma: subtractedPlasma,
            platelet: request.blood_component[0].platelet,
            rbc: request.blood_component[0].rbc,
            wb: request.blood_component[0].wb,
          };

          bloodStores &&
            bloodStores.map((store) => {
              if (store.bag === values.plasma) {
                // console.log(store);
                const newStore = {
                  _id: store._id,
                  bag: store.bag,
                  blood_component: store.blood_component,
                  blood_group: store.blood_group,
                  donor: store.donor,
                  hb: store.hb,
                  status: 'Issued',
                  unit: store.unit,
                };
                updateBloodRequest(newPlasma);
                console.log(newStore);
                updateBloodStore(newStore);
                addBloodIssue(values);
              }
            });
        }
      });
    }

    // Platelet
    if (values.platelet !== '') {
      bloodRequests.map((request) => {
        if (
          request.blood_component[0].platelet > 0 &&
          request._id === blood_request_id
        ) {
          const subtractedPlatelet =
            parseInt(request.blood_component[0].platelet) - 1;
          const newPlatelet = {
            _id: request._id,
            blood_group: request.blood_group,
            patient_id: request.patient_id,
            patient_name: request.patient_name,
            plasma: request.blood_component[0].plasma,
            platelet: subtractedPlatelet,
            rbc: request.blood_component[0].rbc,
            wb: request.blood_component[0].wb,
          };
          bloodStores &&
            bloodStores.map((store) => {
              if (store.bag === values.platelet) {
                const newStore = {
                  _id: store._id,
                  bag: store.bag,
                  blood_component: store.blood_component,
                  blood_group: store.blood_group,
                  donor: store.donor,
                  hb: store.hb,
                  status: 'Issued',
                  unit: store.unit,
                };
                updateBloodRequest(newPlatelet);
                console.log(newStore);
                updateBloodStore(newStore);
                addBloodIssue(values);
              }
            });
        }
      });
    }

    // RBC
    if (values.rbc !== '') {
      bloodRequests.map((request) => {
        if (
          request.blood_component[0].rbc > 0 &&
          request._id === blood_request_id
        ) {
          const subtractedRBC = parseInt(request.blood_component[0].rbc) - 1;
          const newRBC = {
            _id: request._id,
            blood_group: request.blood_group,
            patient_id: request.patient_id,
            patient_name: request.patient_name,
            plasma: request.blood_component[0].plasma,
            platelet: request.blood_component[0].platelet,
            rbc: subtractedRBC,
            wb: request.blood_component[0].wb,
          };
          bloodStores &&
            bloodStores.map((store) => {
              if (store.bag === values.rbc) {
                const newStore = {
                  _id: store._id,
                  bag: store.bag,
                  blood_component: store.blood_component,
                  blood_group: store.blood_group,
                  donor: store.donor,
                  hb: store.hb,
                  status: 'Issued',
                  unit: store.unit,
                };
                updateBloodRequest(newRBC);
                console.log(newStore);
                updateBloodStore(newStore);
                addBloodIssue(values);
              }
            });
        }
      });
    }

    // Whole Blood
    if (values.wb !== '') {
      bloodRequests.map((request) => {
        if (
          request.blood_component[0].wb > 0 &&
          request._id === blood_request_id
        ) {
          const subtractedWB = parseInt(request.blood_component[0].wb) - 1;
          const newWB = {
            _id: request._id,
            blood_group: request.blood_group,
            patient_id: request.patient_id,
            patient_name: request.patient_name,
            plasma: request.blood_component[0].plasma,
            platelet: request.blood_component[0].platelet,
            rbc: request.blood_component[0].rbc,
            wb: subtractedWB,
          };
          bloodStores &&
            bloodStores.map((store) => {
              if (store.bag === values.wb) {
                const newStore = {
                  _id: store._id,
                  bag: store.bag,
                  blood_component: store.blood_component,
                  blood_group: store.blood_group,
                  donor: store.donor,
                  hb: store.hb,
                  status: 'Issued',
                  unit: store.unit,
                };
                updateBloodRequest(newWB);
                console.log(newStore);
                updateBloodStore(newStore);
                addBloodIssue(values);
              }
            });
        }
      });
    }
  };

  useEffect(() => {
    getBloodIssues();
    getBloodRequests();
    getBloodStores();
  }, []);

  const blood_request_id = match.params.id;

  return loading ? (
    <Spinner />
  ) : (
    <div className='row pt-4'>
      <div className='col-md-4'>
        <BloodIssueForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          bloodRequests={bloodRequests}
          blood_request_id={blood_request_id}
          bloodStores={bloodStores}
        />
      </div>
      <div className='col-md-8'>
        <BloodIssueList
          handleUpdate={handleUpdate}
          deleteBloodIssue={deleteBloodIssue}
          bloodIssues={bloodIssues}
        />
      </div>
    </div>
  );
}

BloodIssue.propTypes = {
  getBloodIssues: PropTypes.func.isRequired,
  addBloodIssue: PropTypes.func.isRequired,
  deleteBloodIssue: PropTypes.func.isRequired,
  updateBloodRequest: PropTypes.func.isRequired,
  updateBloodStore: PropTypes.func.isRequired,
  bloodIssues: PropTypes.object.isRequired,
  getBloodRequests: PropTypes.func.isRequired,
  bloodRequests: PropTypes.array.isRequired,
  bloodStores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  bloodIssues: state.bloodIssue,
  bloodRequests: state.bloodRequest.bloodRequests,
  bloodStores: state.bloodStore.bloodStores,
});

export default connect(mapStateToProps, {
  getBloodIssues,
  addBloodIssue,
  deleteBloodIssue,
  getBloodRequests,
  updateBloodRequest,
  getBloodStores,
  updateBloodStore,
})(BloodIssue);