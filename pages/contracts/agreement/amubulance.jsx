import { useContext, useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Skeleton, Title } from '@mantine/core';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import { initialize } from '@/firebase';
import { AuthContext } from '@/context/Auth';

const Ambulance = () => {
  const { user } = useContext(AuthContext);
  const { firestore } = initialize();

  const [day, setDay] = useState('Day');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const [serviceProvider, setServiceProvider] = useState('Service Provider');
  const [registeredOffice, setRegisteredOffice] = useState('Registered Office');
  const [signingAuthority, setSigningAuthority] = useState('Signing Authority');
  const [location, setLocation] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [poc, setPoc] = useState('');

  const [value, loading, error] = useDocumentDataOnce(
    doc(firestore, 'vendors', user?.uid),
  );

  if (loading) {
    return (
      <>
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
      </>
    );
  }

  return (
    <section>
      <Title align="center" order={3} mb={10}>
        Service Agreement
      </Title>
      <p>
        This Service Agreement (<b>“Agreement”</b>) is made on this {day} day of{' '}
        {month}, {year} (<b>“Effective Date”</b>) by and amongst:
      </p>
      <p>
        <b>M/s. Anvayaa Kin Care Pvt. Ltd.</b> Incorporated under the Companies
        Act, 2013 having its registered office at “Plot 705, 202, 2nd Floor,
        Road # 36 Jubilee Hills, Hyderabad, Telangana (PIN – 500033),
        represented by its authorized signatory <b>[Prashanth Reddy - MD]</b>{' '}
        (hereinafter referred to as <b>“Anvayaa”</b> which expression shall,
        unless repugnant to the context or the meaning thereof, be deemed to
        include its nominees and permitted assigns thereof) of the FIRST PART
      </p>
      <p style={{ textAlign: 'center' }}>
        <b>AND</b>
      </p>
      <p>
        <b>{serviceProvider}</b>, a Pvt Ltd company with its registered office
        at {registeredOffice} (hereinafter referred to as{' '}
        <b>“Service Provider”</b>, which expression shall, unless repugnant to
        the context or meaning thereof, be deemed to mean and include its
        successor-in-business and permitted assignee) represented by its{' '}
        {signingAuthority};
      </p>
      <p>
        <b>Anvayaa</b> and <b>Service Provider</b> shall hereinafter be referred
        to individually as a <b>“Party”</b> and collectively as the{' '}
        <b>“Parties”</b>.
      </p>
      <h3>Whereas</h3>
      <ol
        style={{
          listStyleType: 'upper-alpha',
        }}
      >
        <li>
          Anvayaa is engaged in the business of providing a one stop solution to
          all elderly needs for its customer and their beneficiaries (Users) and
          is engaged in operating facility centers for provision of care at home
          for elderly with interalia health care assistance, emergency care
          assistance, emotional and daily needs assistance in addition to
          arranging rehabilitation, therapy and care for people on short term
          and long term basis.
        </li>
        <li>
          The Service Provider is engaged in the business of providing home
          healthcare services including but not limited to manpower (nursing,
          caretaker, physiotherapy, doctor consultation), equipment rental and
          sale, ambulance in ____________________.
        </li>
        <li>
          Anvayaa is on a look out for a home health care service provider for
          purposes of facilitating annual medical health check-up, arranging
          home visits by health care professional, surgery planning, home
          nursing services, care taker services, physiotherapy services,
          admission and discharge formalities etc., <b>(Services)</b> defined in
          detailed in Schedule 1 below.
        </li>
        <li>
          The Service Provider assures and acknowledges that it has the
          necessary expertise, time and resources to perform the Services and in
          view thereof, Anvayaa has agreed to engage the Service Provider to
          take up the Services for their existing and new users/clients and the
          Service Provider has agreed to the same, on terms mutually agreed to
          and mentioned herein below.
        </li>
      </ol>
      <p>
        <b>NOW THEREFORE,</b> in consideration of the mutual covenants and
        agreements set forth in this Agreement and for other good and valuable
        consideration, the sufficiency of which is acknowledged by the Parties,
        the Parties hereby agree as follows:
      </p>
      <h3>SCOPE OF THE AGREEMENT</h3>
      <ol>
        <li>
          The Service Provider is engaged by Anvayaa on non-exclusive basis to
          provide the Services to the users/ clients of Anvayaa (Hereinafter
          ‘User’), which majorly comprise of senior citizens, as per the terms
          set out in this Agreement and in accordance with the best industry
          practices.
        </li>
        <li>
          The Service Provider shall be provided with a mobile application
          <b>(Application)</b> wherein all the health care service requirement
          of the User shall be listed and made available to the Service
          Provider.
        </li>
        <li>
          The health care service requirement of the User shall be categorized
          on the Application as ‘Urgent’ and ‘Routine’. All the Urgent
          requirements shall be addressed by the Service Provider immediately
          upon receipt of the request and Routine requirements shall be
          addressed by the Service Provider within the time frame prescribed
          under the Application.
        </li>
        <li>
          Except in exceptional circumstances, the Service Provider shall
          provide only such services to the User, which are routed through and
          confirmed by Anvayaa or with prior consent of Anvayaa. The Service
          Provider shall not be entitled to any Fee for additional services
          provided by the Service Provider, without prior consent of Anvayaa.
        </li>
        <h3>RESPONSIBILITIES AND DUTIES OF ANVAYAA</h3>
        <li>
          Anvayaa shall be responsible for registering and booking the service
          along with information of the detailed requirements of the user.
        </li>
        <li>
          Anvayaa shall market, promote and sell the services provided by the
          Service Provider on behalf of the Service Provider to the limited
          extent of the services agreed upon in this agreement, through all
          means it finds suitable, including website, call centres, sales
          personnel, emailing, social media and other means.
        </li>
        <li>
          Anvayaa shall, during the term of this Agreement, be entitled to use
          the name, logo, description, and information of the Service Provider
          on its website and other communication and offer services on behalf of
          the Service Provider without any breach of intellectual property
          rights. The brand logo / registered trademark of Service Provider
          would remain the sole property of Service Provider and Anvayaa will
          have no rights, title and/ or interest over the intellectual property
          rights owned by the Service Provider whatsoever except for usage on
          website and for marketing purposes. Anvayaa shall ensure that such
          usage of the intellectual property rights does not cause any harm or
          loss image and goodwill to the Service Provider. Anvayaa shall follow
          all instructions of the Service Provider with respect to the use of
          the intellectual property rights.
        </li>
        <li>
          Service Provider will be preferred partner for Home Healthcare
          Services.
        </li>
        <h3>RESPONSIBILITIES AND DUTIES OF SERVICE PROVIDER</h3>
        <li>
          Immediately upon receipt of the information from Anvayaa, Service
          Provider shall communicate its decision to provide such Services
          requested by the User. In case the Service Provider accepts such
          request, Service Provider shall make necessary arrangements to provide
          the agreed Services to the User as per the nature of the requirement
          within the time prescribed on the Application.
        </li>
        <li>
          Service Provider undertake to ensure that all its representatives are
          sufficiently skilled to cater to any urgent situation that may arise
          in due course of rendering the Services to the Users.
        </li>
        <li>
          Service Provider shall provide the Services through its own employees,
          agents or contractual workforce with all care and diligence as usually
          applicable in the field and in strict accordance with established
          standards and all applicable laws and regulations.
        </li>
        <li>
          Service Provider agrees that it shall be solely responsible and liable
          for the consequences of any fault or negligence of any of its
          employees or agents in providing the Services.
        </li>
        <li>
          Service Provider shall provide the Services through its own employees
          and agents with all care and diligence as usually applicable in the
          field and in strict accordance with established medical standards and
          all applicable laws and regulations.
        </li>
        <li>
          Service Provider shall be entitled to use the Name, Logo, Description,
          and Information of Anvayaa on its website and other communication and
          offer services on behalf of Anvayaa without any breach of intellectual
          property rights. The brand logo / registered trademark of Anvayaa and
          Service Provider would remain the sole property of respective party
          and neither Anvayaa nor Service Provider will have no rights over it
          whatsoever on other party, except for usage on website and for
          marketing purposes.
        </li>
        <li>
          Service Provider agrees that it shall be solely responsible and liable
          for the consequences of any fault or negligence of any of its
          employees or agents in providing the services.
        </li>
        <li>
          All persons employed by Service Provider shall be competent in the
          performance of their duties, and hold and maintain applicable and
          valid certificates/licenses/accreditation in their respective roles or
          profession. Service Provider shall be held accountable for employee
          performance, licensing, and actions.
        </li>
        <li>
          Service Provider shall be entitled to use the Name, Logo, Description,
          and Information of the Other Party on its website and other
          communication and offer services on behalf of the Other Party without
          any breach of intellectual property rights. The brand logo /
          registered trademark of Anvayaa and Service Provider would remain the
          sole property of respective party and neither Anvayaa nor Service
          Provider will have no rights over it whatsoever on other party, except
          for usage on website and for marketing purposes.
        </li>
        <li>
          The Service Provider shall be solely responsible for the payment of
          salaries, or service fees/ remuneration, as the case may be, of the
          staff members appointed by the Service Provider for purposes of
          rendering the Service under this Agreement.
        </li>
        <li>
          The Parties may by mutual consent create a User kit for all patients
          of Service Provider, which describes Service Provider and Anvayaa
          services and distribute the same to all existing patients of Service
          Provider. The User kit would include Service Provider as the home
          healthcare partner addressing all home healthcare needs, and Anvayaa
          as a senior care platform assisting all existing and new patients of
          Service Provider with services those it offers such as daily
          assistance, social assistance, logistic assistance etc.
        </li>
        <li>
          That the Service Provider has provided Anvayaa the price list for the
          Services under Annexure – A of this Agreement. Serivce Provider may,
          at its sole discretion, revise the price for Services by proving
          Anvayaa one-month prior written notice of such revision. It is agreed
          between the Parties that any cases which are running with old pricing
          will not change, however new cases will be served with such updated
          pricing.
        </li>
        <li>
          Incase of service provider aligning the staff and patient refusing at
          deployment, the service provider shall be eligible for one day’s
          payment from Anvayaa to mitigate the operational and deployment cost.
        </li>
        <li>
          Point of Contact details of the Service Provider who shall be
          coordinating with Anvayaa are given below. It is the responsibility of
          the Service Provider to update Anvayaa about the change of the Point
          of Contact so that business communication will not be hampered.
        </li>
        <ul>
          <li>Current POC :</li>
          <li>Location:</li>
          <li>Phone No.</li>
          <li>Email :</li>
        </ul>
        <h3>RECORDS AND REPORTS</h3>
        <li>
          The Parties shall maintain complete, detailed and accurate records of
          all work done either electronically or manually in furtherance of the
          performance of this Agreement
        </li>
        <h3>CONSIDERATION</h3>
        <li>
          The User of the Services rendered by the Servicer Provider shall pay
          the consideration directly to Anvayaa and the Service Provider shall
          not be entitled to demand any payments from the User without prior
          written consent of Anvayaa. Anvayaa shall be solely responsible to
          ensure the collection of consideration from the User.
        </li>
        <li>
          That the price shared with Anvayaa will remain under effect until
          expiry of this contract. In case the price has to be updated due to
          market inflation, Service provider has to update us one month prior
          for its implementation. Any cases which are running with old pricing
          will not change, However new cases will be served with updated
          pricing.
        </li>
        <li>
          The Invoices raised by the Service Provider shall be on the basis of
          the Services rendered and duly certified by the User. Anvayaa shall be
          entitled to deduct tax deductible at source, at applicable rates, on
          payments made to the Service Provider in accordance with the
          applicable provisions of law.
        </li>
        <li>
          It is agreed between the Parties, that Anvayaa shall be liable to pay
          the Fees to the Service Provider under all circumstances except when
          the User has failed to certify the Service due to the reasons
          attributable solely to the Service Provider. In case the User fails to
          certify the Services, due to the reason attributable solely to the
          Service Provider, Anvayaa shall send a written notice to the Service
          Provider within 3 days from the date on which the User was to certify
          the Service. Any claim raised by Anvayaa after the said period shall
          not be valid. The Parties shall then conduct a joint enquiry into the
          alleged reason attributable to the Service Provider. In case both the
          Parties agree that the reason was correctly attributable to the
          Service Provider, then Anvayaa would not be liable to pay Fees for
          such Service. In case the Parties fail to reach a joint understanding,
          the Parties shall deal with it as per the dispute resolution clause
          under this Agreement.
        </li>
        <h3>REPRESENTATIONS AND WARRANTIES</h3>
        <li>The Service Provider represents and warrants as follows:</li>
        <ol
          style={{
            listStyleType: 'lower-alpha',
          }}
        >
          <li>
            it has the full power, right and authority to enter into this
            Agreement and to perform its respective duties and obligations under
            this Agreement in accordance with the terms and conditions of this
            Agreement.
          </li>
          <li>
            it shall maintain all necessary permits, licenses, approvals and
            clearances from governmental authorities or any third parties as may
            be required under law or otherwise by Anvayaa for the purposes of
            this Agreement;
          </li>
          <li>
            its entry into and performance of this Agreement would not conflict
            or violate any applicable law, rule or decree, judgement or order of
            court of law as of the date hereof;
          </li>
          <li>
            its entry into and performance of this Agreement would not conflict
            or violate any Agreements executed by the Service Provider with any
            other third parties;
          </li>
          <li>
            The Service Provider acknowledges that all the information of the
            User shared with the Service Provider and people associated with
            them including the staff deployed with the User is confidential and
            the Service Provider shall ensure that no such information of the
            User shall be used for any purpose other than rendering the Services
            prescribed under this Agreement.
          </li>
          <li>
            The Service Provider acknowledges that in connection with the
            Services rendered under this Agreement, Anvayaa may hire an
            independent third party for verification of the Service Provider and
            the Services rendered by them and the Service Provider shall render
            complete co-operation to such third party agencies. It is clarified
            that the verification contemplated under this clause does not
            include verification of the staff deployed by the Service Provider.
          </li>
          <li>
            The Service Provider acknowledges that Anvayaa is only a facilitator
            and in the event of any omission or commission by the employees,
            staff, agents etc., appointed by the Service Provider, including
            criminal offences, the liability of the same shall not be
            attributable to Anvayaa. The Service Provider shall promptly address
            such grievances of the Users.
          </li>
          <li>
            Service Provider warrants that the employees, staff, agents etc.,
            appointed by the Service Provider, for purposes of rendering
            Services to the Users are duly remunerated
          </li>
          <li>
            The Service Provider shall not collude with the User/end-customer or
            indulge in corrupt acts that are detrimental to Anvayaa. For the
            purpose of clarity, it is agreed by the Service Provider that he
            shall not directly offer any services/products to the
            Users/end-customers without consultation with Anvayaa and shall not
            involve itself with Users/end-customers in a covert manner without
            involving Anvayaa and/or in a manner that is detrimental to Anvayaa.
            In the event of violation of this Clause, the Service Provider shall
            be liable to pay Anvayaa damages at the rate of 3 times the total
            Fees paid by Anvayaa to the Service Provider for the Service
            provided to the User.
          </li>
        </ol>
        <h3>INSPECTION AND QUALITY CONTROL</h3>
        <li>
          Anvayaa shall have the unconditional right to inspect the Services
          being rendered by the Service Provider to assure quality control
          through its care managers allotted to each User or through any other
          representative. In the event that such an inspection reveals
          deficiencies or unsatisfactory conditions, Anvayaa, may, at its sole
          discretion, send the Service Provider an inspection report, and demand
          that Service Provider to immediately rectify the defects, deficiencies
          or unsatisfactory conditions. If the Service Provider fails to correct
          any deficiency within the time period written on the inspection report
          or communicated by Anvayaa, Anvayaa shall have the right to terminate
          this Agreement and dues for the said Service shall not be paid and
          Agreement may be terminated.
        </li>
        <h3>INDEMNITY AND LIMITATION OF LIABILITY</h3>
        <li>
          Notwithstanding anything contained in this Agreement, the Service
          Provider hereby agrees to indemnify and keep safe Anvayaa from and
          against claims, demands, actions, liabilities, costs, interest,
          damages and expenses of any nature whatsoever (including all legal and
          other costs, charges and expenses) incurred or suffered by Anvayaa,
          arising out of any (a) any wrongful or negligent act or omission of
          the Service Provider; (b) any breach of Service Providers obligations
          under this Agreement; and, (c) any Users/third party action or claim
          made against Anvayaa, (d) any statutory liabilities/fines imposed
          under any applicable laws or government bodies, by reason of any
          actions undertaken by the Service Provider arising out of its
          obligations under this Agreement. The rights, powers, privilege and
          remedies provided in this Indemnity are cumulative and not exclusive
          of any rights, powers, privileges or remedies provided by law.
        </li>
        <li>
          Notwithstanding clauses pertaining to confidentiality, Service
          Provider shall not be liable for any indirect, special, exemplary,
          incidental or consequential loss or damage or for any lost profits,
          lost savings or loss of revenues suffered by Anvayaa arising from or
          in any way connected with this Agreement and the liability of the
          Service Provider shall not exceed the Fees paid by Anvayaa to the
          Service Provider for the previous month.
        </li>
        <li>
          Notwithstanding clauses pertaining to confidentiality and intellectual
          property rights, Anvayaa shall not be liable for any indirect,
          special, exemplary, incidental or consequential loss or damage or for
          any lost profits, lost savings or loss of revenues suffered by Service
          Provider arising from or in any way connected with this Agreement and
          liability of Anvayaa shall not exceed the payment clause of this
          Agreement.
        </li>
        <li>
          Both the Parties agree to indemnify and hold the other party harmless
          from any and all actions, awards, claims, losses, damages, costs and
          expenses (including reasonable attorneys’ fees) attributable to such
          party’s breach of this Agreement or to any negligent, grossly
          negligent, willful or unlawful acts or omissions of such party, its
          employees, officers, agents, subcontractors, dealers or
          representatives.
        </li>
        <h3>TERM AND TERMINATION</h3>
        <li>
          This Agreement shall be valid for a period of [1] years, from the date
          of signing the agreement, subject to further renewal upon mutual
          agreement of both the parties.
        </li>
        <li>
          Either Party may terminate this Agreement on the occurrence of any of
          the following events:
        </li>
        <ol
          style={{
            listStyleType: 'lower-roman',
          }}
        >
          <li>
            Immediately, if either Party is declared insolvent or bankrupt or is
            unable to pay its debts or makes a composition with its creditors;
          </li>
          <li>
            Immediately, if either Party is dissolved or wound up compulsorily
            or if an order made or an effective resolution is passed for the
            winding up of the such Party;
          </li>
        </ol>
        <li>
          Both the parties are at liberty to terminate the agreement before the
          expiry period provided a written notice of termination of at least 30
          days is given to the other party.
        </li>
        <li>
          Any violation of the terms of this agreement will entitle the effected
          party to immediately terminate the agreement without adhering to the
          mandatory notice period clause.
        </li>
        <h3>CONSEQUENCE OF TERMINATION</h3>
        <li>
          In the event of any termination of this Agreement, unless agreed
          otherwise in writing, based on the nature of requirement and Services
          being rendered to a particular User, the Service Provider shall cease
          to render the Services to the Users of Anvayaa. In case a Service/case
          is terminated or a service/case is close due to following actions of
          the Care Taker or Nurse or Semi Nurse, fees shall not be paid by
          Anvayaa;
        </li>
        <ol>
          <li>Drunk</li>
          <li>Theft</li>
          <li>
            Absconding, if the Service Provider fails to send a replacement
            within 24 hours
          </li>
          <li>Sharing one profile and sending other.</li>
        </ol>
        <li>
          Upon termination of this Agreement, Anvayaa may by notice require the
          Service Provider to promptly return all Confidential Information which
          have been provided by or on behalf of Anvayaa; and the Service
          Provider shall destroy any copies of such documents and any document
          containing or made from or with reference to the relevant information
          and take all reasonable steps to expunge all relevant information from
          any computer, word processor or other device containing relevant
          information.
        </li>
        <h3>GOVERNING LAW AND JURISDICTION</h3>
        <li>
          It is agreed that all the disputes, if any, shall be primarily
          resolved amicably by mutual discussions.
        </li>
        <li>
          Any action to enforce the terms of this Agreement, or any action which
          arises out of or relates in any way to any of the provisions of this
          agreement or the relationship or dealings between the Parties hereto,
          shall be governed by the laws of India and be brought and prosecuted
          solely in Faridabad, Haryana, India.
        </li>
        <h3>Dispute Resolution:</h3>
        <li>
          Any dispute that arises under this agreement or with respect of this
          Agreement shall be resolved through formal negotiation between the
          parties. In the event that the Parties fail to arrive at an amicable
          resolution within 30 (thirty) days of the dispute having arisen, the
          matter shall be finally resolved by arbitration under a sole
          arbitrator, to be held under the provisions of the Indian Arbitration
          and Conciliation Act 1996 (as amended from time to time). The sole
          arbitrator shall be mutually appointed by the Parties failing which
          such sole arbitrator shall be appointed under the provisions of the
          Indian Arbitration and Conciliation Act 1996 (as amended from time to
          time). The seat and venue of the arbitration proceedings shall be
          Hyderabad and the arbitration shall be conducted in the English
          language. The Award passed by the Arbitrator shall be final and
          binding on both the parties. Subject to the above, the courts at
          Hyderabad shall have the sole and exclusive jurisdiction to resolve
          any disputes or disagreements that arise in relation to this
          Agreement.
        </li>
        <h3>MISCELLANEOUS</h3>
        <li>
          Any notice provided for in this Agreement shall be in writing and
          shall be (i) first transmitted by email, acknowledgement due or by
          recognized courier service; or (ii) sent by postage, prepaid
          registered post with acknowledgement due or by a recognized courier
          service, to the relevant party at its address set out above.
        </li>
        <li>
          This Agreement is on a principal-to-principal basis and nothing
          contained herein shall be deemed to create an association,
          partnership, joint venture or relationship of principal and agent or
          master and servant, or employer and employee between the Parties.
        </li>
        <li>
          Service Provider shall not assign this Agreement or any of its rights
          and obligations hereunder, without the prior written consent of the
          Anvayaa and any such attempted assignment shall be null and void.
        </li>
        <li>
          The waiver by either Party of a breach, default, delay or commission
          of any of the provisions of this Agreement by the other Party will not
          be construe as a waiver of any subsequent breach of the same or other
          provision.
        </li>
        <li>
          Any provision of this Agreement which is prohibited, unenforceable or
          is declared or found to be illegal, unenforceable or void in any
          jurisdiction shall as to such jurisdiction be ineffective only to the
          extent of such prohibition or unenforceability without invalidating
          the remainder of such provision or the remaining provisions of this
          Agreement or affecting the validity or enforceability of such
          provision in any other jurisdiction. If any such invalidity
          substantially affects or alters the basis of this Agreement, the
          Parties shall negotiate in good faith to amend and modify the
          provisions and terms of this Agreement as may be necessary or
          desirable in the circumstances to achieve as closely as possible the
          same effect as the original provisions and terms of this Agreement.
        </li>
        <li>
          This Agreement, along with the Terms of Use and Privacy Policy as
          detailed by Anvayaa on its website www.anvayaa.com, sets forth and
          shall constitute the entire Agreement between the Parties with respect
          to the subject matter hereof and shall supersede any and all prior
          agreements, understandings, promises and representations made by one
          Party to the other concerning the subject matter. In case of any
          inconsistency between the Terms of Use, Privacy Policy and this
          Agreement, the terms of this Agreement shall prevail.
        </li>
        <li>This Agreement may be executed in two or more counterparts.</li>
      </ol>
      <p>
        IN WITNESS WHEREOF, both the authorized representatives of the Parties
        have entered into this Agreement and duly fixed their signatures under
        hand and seal.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p>ANVAYAA KINCARE PVT. LTD.</p>
          <br />
          <br />
          <p>
            Rep by: <b>Prashanth Reddy</b> DIRECTOR
          </p>
        </div>
        <div>
          <p>M/s </p>
          <br />
          <br />
          <p>Rep by: Designation:</p>
        </div>
      </div>
    </section>
  );
};

Ambulance.getLayout = function getLayout(page) {
  return <ProtectedLayout noActions>{page}</ProtectedLayout>;
};
export default Ambulance;
